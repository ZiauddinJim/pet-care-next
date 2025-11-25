import { FadeLoader } from "react-spinners";


const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <FadeLoader color="#ff5933" />
        </div>
    );
};

export default Spinner;