import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";

import { FiTrash } from "react-icons/fi";
import { db } from '../../services/firebaseConnection'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'


interface LinksPropos {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string
}

export function Admin() {

    const [nameInput, setNameInput] = useState('');
    const [UrlInput, setUrlInput] = useState('');
    const [TextColorInput, setTextColorInput] = useState('#FFFFFF');
    const [BackgroundColorInput, setBackgroundColorInput] = useState('#000000');

    const [links, setLinks] = useState<LinksPropos[]>([]);

    //Buscando a lista de links cadastrados
    useEffect(() => {

        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"));
        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksPropos[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)
        })

        return () => {
            unsub();
        }

    }, [])

    // Cadastrando links no banco
    function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === "" || UrlInput === "") {
            alert("Preencha todos os campos")
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: UrlInput,
            bg: BackgroundColorInput,
            color: TextColorInput,
            created: new Date()
        }).then(() => {
            console.log("Cadastrado com sucesso");
            setNameInput("");
            setUrlInput("");
            setBackgroundColorInput("#000000");
            setTextColorInput("#FFFFFF")
        }).catch((error) => {
            console.log("ERRO AO CADASTRAR NO BANCO", error)
        })
    }

    //Deletando Links
    async function handleDeleteLink(id: string){
        console.log(id);
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Informe o Link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input
                    type="url"
                    placeholder="Informe URL do Link"
                    value={UrlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input
                            type="color"
                            value={BackgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input
                            type="color"
                            value={TextColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {
                    nameInput !== '' && (
                        <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                            <label className="text-white font-medium mt-2 mb-3">Pré Visualização</label>
                            <article
                                className=" w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded-md px-1 py-3"
                                style={{ marginBottom: 8, marginTop: 8, backgroundColor: BackgroundColorInput }}
                            >
                                <p style={{ color: TextColorInput }}>{nameInput}</p>
                            </article>
                        </div>
                    )
                }

                <button type="submit" className="bg-blue-600 rounded-md text-white font-medium gar-4 flex justify-center items-center h-9 mb-3 mt-3 cursor-pointer">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 mt-4 text-2xl">Meus Link</h2>

            {links &&
                links.map((link) => (
                    <article
                        key={link.id}
                        className="flex items-center justify-between gap-3 w-11/12 max-w-xl rounded py-3 px-3 mb-2"
                        style={{ backgroundColor: link.bg, color: link.color}}
                    >
                        <p>{link.name}</p>
                        <div>
                            <button onClick={ () => handleDeleteLink(link.id) } className="border border-dashed py-1 px-2 rounded cursor-pointer">
                                <FiTrash size={18} color="#FFF" />
                            </button>
                        </div>
                    </article>
                ))}


        </div>
    )
}