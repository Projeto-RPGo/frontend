
import LogoWithTitle from "@/components/Images/logoWithTitle";

export default function HomePage() {
    return (
        <div className="bg-[#D4A59A] pt-5">
          <div className="flex items-center justify-center h-auto bg-[#D4A59A] pb-10">
            <div className="w-full max-w-sm p-6">
              <LogoWithTitle />
              <h1 className="text-center text-white mt-4 text-2xl">Texto base home page</h1>
            </div>
          </div>
        </div>
    );
}