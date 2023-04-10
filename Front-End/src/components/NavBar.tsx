import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Customer, Employee } from "../DTO/dtos";
type Props = {
    customer: Customer | undefined;
    employee: Employee | undefined;
    setCustomer,
    setEmployee,
};
export const NavBar = ({customer, setCustomer, employee, setEmployee}: Props) => {
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
                <Link to={customer? "/":"/Login"} className="mx-3">
                <Button onClick={handleButton}>
                    {!customer && !employee ? "Login" : "Logout"}
                </Button>
                </Link>
                <Navbar.Toggle />
                <div className="mx-5 py-2">{customer? customer.fullname : ""}</div>
                <div className="mx-5 py-2">{employee? employee.fullname : ""}</div>
            </div>
            <Navbar.Collapse>
                {customer && 
                    <>
                         <Link to={"/"}><Navbar.Link href="">Home</Navbar.Link></Link> 
                         <Link to={"/Bookings"}><Navbar.Link href=""> Bookings </Navbar.Link></Link>
                         <Link to={"/Views"}><Navbar.Link href=""> Views</Navbar.Link></Link> 
                         <Link to={"/CustomerUpdate"}><Navbar.Link href=""> Update Account</Navbar.Link></Link> 
                    </>
                }
                {employee && 
                    <>
                        <Link to={"/"}><Navbar.Link href=""> Bookings </Navbar.Link></Link>
                        <Link to={"/Rentings"}><Navbar.Link href=""> Rentings </Navbar.Link></Link>
                        <Link to={"/EmployeeUpdate"}><Navbar.Link href=""> Update Account </Navbar.Link></Link>
                        { employee.ismanager && 
                            <>
                            <Link to={"/HotelUpdate"}><Navbar.Link href=""> Update Hotel</Navbar.Link></Link>
                            <Link to={"/RoomUpdate"}><Navbar.Link href=""> Update Room</Navbar.Link></Link>
                            </>
                        }
                    </>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};
