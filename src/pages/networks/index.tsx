import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { FormEvent, useEffect, useState } from 'react';
import { db } from "../../services/firebaseConnection";
import { setDoc, getDoc, doc } from 'firebase/firestore';

export const Networks = () => 
{

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const handleRegister =  (e: FormEvent) => {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook,
            instagram,
            youtube,
            linkedin
        })
        .then(() => {
            console.log("cadastrados com sucesso");
        })
        .catch((error) => {
            console.log("erro ao cadastrar: ", error);
        })
    }

    useEffect(() => {
        const docRef = doc(db, "social", "link");

        getDoc(docRef)
        .then(snapshot => {

            if(snapshot.data() !== undefined){
                setFacebook(snapshot.data()?.facebook);
                setInstagram(snapshot.data()?.instagram);
                setYoutube(snapshot.data()?.youtube);
            }
        });
    }, []);

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input type="url" placeholder="Digite a url do facebook..." value={facebook} onChange={e => setFacebook(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input type="url" placeholder="Digite a url do instagram..." value={instagram} onChange={e => setInstagram(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input type="url" placeholder="Digite a url do youtube..." value={youtube} onChange={e => setYoutube(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
                <Input type="url" placeholder="Digite a url do linkedin..." value={linkedin} onChange={e => setLinkedin(e.target.value)}/>

                <button type="submit" className=" mt-4 transition-transform transform duration-200 hover:scale-105 active:scale-95 font-medium text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7">Salvar links</button>
            </form>
        </div>
    )
}