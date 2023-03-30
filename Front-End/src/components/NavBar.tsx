import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
export const NavBar = ({customer, setCustomer}) => {
    const handleButton = () => {
        if (customer) {
            setCustomer(undefined)
        }
    }
    return (
        <Navbar fluid={true} rounded={true}  className=" lg:mx-24 md:mx-12 sm:mx-4 max-w-6xl xl:mx-auto">
            <Navbar.Brand href="">
                <img
                    src="/src/media/logo.svg"
                    className="mr-3 h-6 sm:h-9 self-center whitespace-nowrap"
                    alt="Company Logo"
                />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button onClick={handleButton}><Link to={customer? "/":"/Login"}>{
                    customer? "Logout" : "Login"
                }</Link></Button>
                <Navbar.Toggle />
                <div className="mx-5 py-2">{customer? customer.fullname : ""}</div>
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/navbars" active={true}>
                    <Link to={"/"}>Contact</Link>
                </Navbar.Link>
                <Navbar.Link href=""><Link to={"/"}>Book</Link></Navbar.Link>
                <Navbar.Link href=""><Link to={"/"}>Hotels</Link></Navbar.Link>
                <Navbar.Link href=""><Link to={"/"}>About</Link></Navbar.Link>
                <Navbar.Link href=""><Link to={"/"}>Contact</Link></Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
