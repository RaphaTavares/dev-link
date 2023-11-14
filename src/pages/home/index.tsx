import { Social } from "../../components/social"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { db } from "../../services/firebaseConnection";
import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinkProps{
    facebook: string;
    youtube: string;
    instagram: string;
    linkedin: string;
}

export const Home = () => 
{
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        getDocs(queryRef)
        .then(snapshot => {
            let lista = [] as LinkProps[];

            snapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                });
            });

            setLinks(lista);
        });

    }, []);

    useEffect(() => {
        const docRef = doc(db, "social", "link");
        
        getDoc(docRef)
        .then(snapshot => {
            if(snapshot.data() !== undefined)
                setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
            linkedin: snapshot.data()?.linkedin
            });
        });
    });

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">Raphael Tavares</h1>
            <span className="md:text-lg text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                { links.map(link => (
                    <section key={link.id}
                    style={{backgroundColor: link.bg}}
                     className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href={link.url} target="_blank">
                            <p style={{color: link.color}} className="md:text-lg text-base">{link.name}</p>
                        </a>
                    </section>
                ))
                }

                
                    {
                        socialLinks && Object.keys(socialLinks).length > 0 && (
                            <footer className="flex justify-center gap-3 my-4">
                                {socialLinks?.facebook && <Social url={socialLinks?.facebook} ><FaFacebook size={35} color="#fff"/></Social>}
                        
                                {socialLinks?.instagram && <Social url={socialLinks?.instagram}><FaInstagram size={35} color="#fff"/></Social>}

                                {socialLinks?.linkedin && <Social url={socialLinks?.linkedin}><FaLinkedin size={35} color="#fff"/></Social>}

                                {socialLinks?.youtube && <Social url={socialLinks?.youtube}><FaYoutube size={35} color="#fff"/></Social>}
                            </footer>
                        )
                    }
            </main>

        </div>
    )
}