import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div className='bg-purple-900 h-screen flex items-center justify-center' style={{
            background: "url('https://www.diocesecpa.org/blog/wp-content/uploads/2019/07/Focus.jpg') no-repeat center center / cover;"
        }}>
            <div className='bg-white opacity-60 p-5 rounded-lg'>
                Teste
            </div>
        </div>
    )
}

export default Home
