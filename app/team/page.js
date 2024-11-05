import { Image } from '@nextui-org/react';

export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-gray-800 to-blue-800 text-white text-center py-8 shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">Our Team</h1>
      </header>

      <section className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Lead */}
          <div className="col-span-1 flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
            <Image
              src="Thirumurugan.jpeg"
              alt="Thirumurugan AKS"
              className="rounded-full object-cover"
              width={150}
              height={150}
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">THIRUMURUGAN AKS</h2>
            <p className="mt-2 text-blue-600 font-medium">Team Leader</p>
            <p className="mt-4 text-gray-500 text-center">
              Leading the team Tech Buddy,Full stack web,app,game developer
            </p>
          </div>

          {/* Team Members */}
          <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Balaji.jpeg"
                alt="Balaji"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Balaji</h2>
              <p className="mt-2 text-blue-600 font-medium">Backend Developer</p>
              <p className="mt-4 text-gray-500 text-center">
              Frontend developer,Iot,Ui/Ux
            </p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Jayanesh.jpeg"
                alt="Jayanesh"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Jayanesh</h2>
              <p className="mt-2 text-blue-600 font-medium">Frontend Developer</p>
              <p className="mt-4 text-gray-500 text-center">
              Expert at AI,React Developer
            </p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Pavithra.jpeg"
                alt="Pavithra"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Pavithra</h2>
              <p className="mt-2 text-blue-600 font-medium">UI/UX Designer</p>
              <p className="mt-4 text-gray-500 text-center">
              UI/Ux designer,Buisness analyst
            </p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Shanmugashree.jpeg"
                alt="Shanmuga"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Shanmugashree</h2>
              <p className="mt-2 text-blue-600 font-medium">Public Speaker</p>
              <p className="mt-4 text-gray-500 text-center">
              UI/Ux develope,Public Speaker
            </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}