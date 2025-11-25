import Link from 'next/link';
import { FaArrowCircleRight } from 'react-icons/fa';

const MyBtn = ({ children, className, to, }) => {
    return (
        <Link href={to}
            className={`relative overflow-hidden
        btn btn-primary btn-outline
        flex items-center gap-2
        group transition-all duration-500 font-medium w-fit ${className}`}>
            {/* background animation layer */}
            <span
                className="
          absolute inset-0 bg-primary
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500
        "></span>

            {/* content (stays visible above background) */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
                <FaArrowCircleRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </span>
        </Link>
    );
};

export default MyBtn;