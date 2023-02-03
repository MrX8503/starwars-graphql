import Link from 'next/link';

import '../styles/global.css';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="container mx-auto pt-10">
                    <div className="prose">
                        <Link href="/" className="no-underline">
                            <h1>Star Wars</h1>
                        </Link>
                    </div>
                </div>
                <div className="container mx-auto grid grid-cols-12 gap-8 py-10">
                    <div className="col-span-2 prose">
                        <ul>
                            <li>
                                <Link href="/films">Films</Link>
                            </li>
                            <li>
                                <Link href="/planets">Planets</Link>
                            </li>
                            <li>
                                <Link href="/starships">Starships</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-10">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
