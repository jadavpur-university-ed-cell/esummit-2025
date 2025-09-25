import Image from "next/image";

export default function NotSigned() {
    return (
        <div
            className="min-h-screen flex items-center justify-center pb-5"
            style={{
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
            }}
        >
            <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-22 text-center text-white">
                <Image
                    src="/home/logo.svg"
                    alt="E-Summit Logo"
                    width={500}
                    height={500}
                    className="drop-shadow-[0px_32px_32px_rgba(80,0,180,0.45)]"
                />
                <div className="mt-6 text-[#afb2f5] text-2xl font-semibold">
                    Please sign in to view this page.
                </div>
            </div>
        </div>

    );
}