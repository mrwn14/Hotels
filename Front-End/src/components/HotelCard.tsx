import { Container, Grid } from "@mui/material";

export const HotelCard = ({ hotelChain, price, location }) => {
    return (
        <div className="max-w-[18rem] mx-3 my-3 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img
                    className="rounded-t-lg"
                    src="/src/media/test.webp"
                    alt=""
                />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Hilton
                    </h5>
                </a>
                    <Grid
                    container
                    direction={"row"}
                    alignItems="stretch"
                    className="mb-2"
                    >
                        <Grid item xs={6}>
                        📍 New York
                        </Grid>
                        <Grid item xs={4.5}>
                        💲 300
                        </Grid>
                        <Grid item xs={1.5}>
                        ⭐ 5
                        </Grid>
                    </Grid>
                    <Grid
                    container
                    direction={"row"}
                    alignItems="stretch"
                    >
                        <Grid item xs={4.5}>
                        Extendable
                        </Grid>
                        <Grid item xs={2}>
                        ✔️
                        </Grid>
                        <Grid item xs={4.5}>
                        Damages
                        </Grid>
                        <Grid item xs={1}>
                        ❌
                        </Grid>
                    </Grid>
                    <Grid
                    container
                    direction={"row"}
                    alignItems="stretch"
                    >
                        <Grid item xs={4.5}>
                        Mountain
                        </Grid>
                        <Grid item xs={2}>
                        ✔️
                        </Grid>
                        <Grid item xs={4.5}>
                        Sea View
                        </Grid>
                        <Grid item xs={1}>
                        ✔️
                        </Grid>
                    </Grid>
                <p className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400">
                    Three Person room in Hilton Hotel's New York location with a rating of 5 stars.
                </p>
                <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Book
                    <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    );
};
