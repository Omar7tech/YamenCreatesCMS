import Nav from "./nav/Nav"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header>
                <Nav/>
            </header>
            <article>{children}</article>
        </main>
    )
}