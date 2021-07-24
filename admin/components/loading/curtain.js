import Image from 'next/image'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default function LoadingOverlay({show}) {

    const [isOver18, setIsOver18] = useState()
    const [shouldShow, setShouldShow] = useState(show)

    const router = useRouter()

    useEffect(() => {

        if(isOver18) {
            // router.push("/")
            const cookies = parseCookies()
            console.log({ cookies })

            setShouldShow(false)

        } else if (isOver18 === false) {
            
            //router.push("https://www.disney.com/")
        } else {
            
            setShouldShow(true)
        }

    }, [isOver18])

    if (shouldShow) {
        return (
            <div className="fixed bg-pink-600 m-auto z-40 inset-0 flex text-white">   
                <div className="w-screen h-screen m-auto flex items-center justify-center">
                    <div className="flex-none m-auto text-center space-y-4">
                        <p className="text-3xl font-bold">Are you over 18?</p>
                        <div className="">
                            <Image src="/placeholders/brittney.jpg" width={300} height={300} className="rounded-lg shadow-lg"/>
                        </div>

                        <div className="flex justify-center gap-8">

                            <div className="flex flex-col items-center gap-2">
                                <label className="text-xl font-bold"> YES </label>
                                <input type="radio" className='form-radio' name="over18" value={isOver18} onChange={() => setIsOver18(true)} />
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <label className="text-xl font-bold"> NO </label>
                                <input type="radio" className='form-radio' name="under18" value={isOver18} onChange={() => setIsOver18(false)} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

    
}