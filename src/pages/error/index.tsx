import { Link } from 'react-router-dom'

export function ErrorPage() {
    return (

        <div className='flex w-full justify-center items-center flex-col text-white min-h-screen'>

            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                    Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            <h1 className='text-6xl text-amber-600 font-bold mb-4'>404</h1>
            <h1 className='text-4xl  font-medium mb-6'>Página não encontrada</h1>

            <p className='italic mb-4'>Essa página não existe</p>

            <Link to="/" className='bg-gray-50/20 py-2 px-6 rounded-md cursor-pointer'>
                Voltar para Home
            </Link>
        </div>
    )
}