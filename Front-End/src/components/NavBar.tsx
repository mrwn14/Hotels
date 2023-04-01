import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
export const NavBar = ({customer, setCustomer, employee, setEmployee}) => {
    const handleButton = () => {
        if (customer) {
            setCustomer(undefined)
        }
        if (employee) {
            setEmployee(undefined)
        }
    }
    return (
        <Navbar fluid={true} rounded={true}  className=" lg:mx-24 md:mx-12 sm:mx-4 max-w-6xl xl:mx-auto">
            <Link to="/">
                <Navbar.Brand href="">
                    <img
                        src="/src/media/logo.svg"
                        className="mr-3 h-6 sm:h-9 self-center whitespace-nowrap"
                        alt="Company Logo"
                    />
                </Navbar.Brand>
            </Link>
            <div className="flex md:order-2">
                <Link to={customer? "/":"/Login"}>
                <Button onClick={handleButton}>{
                    customer? "Logout" : "Login"
                }</Button>
                </Link>
                <Navbar.Toggle />
                <div className="mx-5 py-2">{customer? customer.fullname : ""}</div>
                <div className="mx-5 py-2">{employee? employee.fullname : ""}</div>
            </div>
            <Navbar.Collapse>
                {customer && <Navbar.Link href="/navbars" active={true}>
                    <Link to={"/"}>Home</Link>
                </Navbar.Link>}
                {employee && <Navbar.Link href=""><Link to={"/"}>Bookings</Link></Navbar.Link>}
                {customer && <Navbar.Link href=""><Link to={"/Bookings"}>Bookings</Link></Navbar.Link>}
                {employee && <Navbar.Link href=""><Link to={"/Rentings"}>Rentings</Link></Navbar.Link>}
            </Navbar.Collapse>
        </Navbar>
    );
};
