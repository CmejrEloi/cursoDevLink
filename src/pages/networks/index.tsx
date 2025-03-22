import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";

import { db } from '../../services/firebaseConnection'
import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'

export function Network() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    //Buscando links das redes sociais
    useEffect( () => {
        function loadLinks(){
            const docRef = doc(db, "social", "link");
            getDoc(docRef).then((snapshot) => {
                console.log(snapshot.data())
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook);
                    setInstagram(snapshot.data()?.instagram);
                    setYoutube(snapshot.data()?.youtube)
                } 
            }).catch((error) => {
                console.log("ERRO AO BUSCAR LINKS", error)
            })
        }

        loadLinks()
    }, [])

    //Atualizando links das redes sociais
    function handleRegister(e: FormEvent){
        e.preventDefault();

        if (instagram === "" || facebook === "" || youtube === "") {
            alert("Preencha todos os campos")
            return;
        }

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        }).then( () => {
            console.log("CADASTRADO COM SUCESSO")
        }).catch ( (error) => {
            console.log("ERRO AO CADASTRAR URL", error)
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className=" flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do Facebook</label>
                <Input
                    placeholder="Digite a URL do Facebook"
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input
                    placeholder="Digite a URL do Instagram"
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Youtube</label>
                <Input
                    placeholder="Digite a URL do Youtube"
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button type="submit" className="bg-blue-600 rounded-md text-white font-medium gar-4 flex justify-center items-center h-9 mb-3 mt-3 cursor-pointer">Salvar Links</button>
            </form>
        </div>
    )
}