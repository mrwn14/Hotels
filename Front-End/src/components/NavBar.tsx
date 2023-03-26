import { Navbar, Button } from "flowbite-react";
export const NavBar = () => {
    return (
        <Navbar fluid={true} rounded={true} className="bg-slate-100">
            <Navbar.Brand href="">
                <img
                    src="/src/media/logo.svg"
                    className="mr-3 h-6 sm:h-9 self-center whitespace-nowrap"
                    alt="Company Logo"
                />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>Get started</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/navbars" active={true}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">Book</Navbar.Link>
                <Navbar.Link href="/navbars">Hotels</Navbar.Link>
                <Navbar.Link href="/navbars">About</Navbar.Link>
                <Navbar.Link href="/navbars">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
