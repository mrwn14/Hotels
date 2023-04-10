import axios from "axios";
import dayjs from "dayjs";
import {
    useParams,
    useNavigate
  } from "react-router-dom";
export const HotelView = ({customer}) => {
    let {roomid,
        extendable,
        damages,
        mountain,
        sea,
        address,
        fullAddress,
        hotelid,
        hotelChain,
        rating,
        price,
        amenities,
        checkInValue,
        checkOutValue,
        capacity,
        customerid
    } = useParams();
    console.log(customer);
    
    const nav = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(customer == undefined){
            nav('/Login');
        }
        else{
            let data = {
                customerid: customerid,
                hotelid : hotelid,
                roomid: roomid,
                bookingdate: dayjs().format('YYYY-MM-DD'),
                checkInValue: checkInValue,
                checkOutValue: checkOutValue
            };
            axios
                .post("http://localhost:4000/Book", data)
                .then((response) => {
                    if(response.status == 200){
                        alert("Thank you for booking with us!")
                        nav('/')
                    }

                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }
        
    }
    
  return (
    <div className="relative  max-w-md mx-auto mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#202020] underline">
                    Booking Review
                </h1>
                <form className="mt-6" onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Hotel name
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >
                            {hotelChain}
                        </div>
                        
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            City
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >   
                            {address}
                        </div>
                        
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Full Address
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >   
                            {fullAddress}
                        </div>
                        
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Rating
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >   
                            {rating} stars
                        </div>
                        
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Room details
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >
                        Beautiful room with a capacity of {capacity} and a{' '}   
                        {mountain && "mountain view, "}
                        {sea && "sea view, "}
                        {amenities}{'.'}
                        </div>
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Duration
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >   
                        {dayjs(checkInValue).format("LL")} -  {dayjs(checkOutValue).format("LL")}
                        </div>
                    </div>
                    <div className="mb-2">
                        <div
                            className="block text-lg font-semibold text-gray-800"
                        >
                            Total price
                        </div>
                        <div
                            className="block text-sm  text-gray-800"
                        >   
                        {price && dayjs(checkInValue).diff(checkOutValue,'d')*-1*parseInt(price)}{'$ = '}{price +"$ / night"+' * '+ dayjs(checkInValue).diff(checkOutValue,'d')*-1 + ' nights'}
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Confirm
                        </button>
                    </div>

                </form>


            </div>
        </div>
  )
}
