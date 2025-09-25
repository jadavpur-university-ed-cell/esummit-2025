import Image from "next/image";

export default function SuperAdminDashboard() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
            }}
        >
            <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-10 text-center text-white">
                <Image
                    src="/home/logo.svg"
                    alt="E-Summit Logo"
                    width={500}
                    height={500}
                    className="drop-shadow-[0px_32px_32px_rgba(80,0,180,0.45)]"
                />
                <div className="mt-6 text-red-500 text-2xl font-semibold">
                    Super Admin Dashboard
                </div>
                <div className="text-[#afb2f5] text-2xl font-semibold">
                    Hello
                </div>
            </div>
        </div>
    )
}