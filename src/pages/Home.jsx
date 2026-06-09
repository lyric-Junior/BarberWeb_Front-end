import React, { useState } from "react";

export default function Home() {
const [menuOpen, setMenuOpen] = useState(false);

const userName = localStorage.getItem('username');
const email = localStorage.getItem('email');
const numero = localStorage.getItem('numero')

const appointments = [
{
id: 1,
barber: "João",
date: "15/06/2026",
time: "09:00"
},
{
id: 2,
barber: "Carlos",
date: "15/06/2026",
time: "10:00"
},
{
id: 3,
barber: "Lucas",
date: "15/06/2026",
time: "11:00"
},
{
id: 4,
barber: "Pedro",
date: "15/06/2026",
time: "13:00"
}
];

return ( 
<div className="min-h-screen bg-linear-to-br from-black to-purple-900">

```
  {/* Header */}
  <header className="h-16 border-b border-purple-900 flex items-center px-5">

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex flex-col gap-1"
    >
      <span className="w-6 h-0.75 bg-white rounded"></span>
      <span className="w-6 h-0.75 bg-white rounded"></span>
      <span className="w-6 h-0.75 bg-white rounded"></span>
    </button>

    <h1 className="text-white text-2xl font-bold ml-5">
      Agendamentos
    </h1>
  </header>

  {/* Sidebar */}
  <aside
    className={`
      fixed
      top-0
      left-0
      h-full
      w-72
      bg-black
      border-r
      border-purple-800
      z-50
      transform
      transition-transform
      duration-300
      ${menuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    <div className="p-6">

      <h2 className="text-white text-2xl font-bold mb-6">
        Perfil
      </h2>

      <div className="space-y-4">

        <div id="profile-username" className="border rounded-xl ">
          
        </div>

        <div>
          <label className="text-white font-bold block mb-2">
            Telefone
          </label>

          <input
            type="text"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-purple-700 text-white"
          />
        </div>

        <div>
          <label className="text-white font-bold block mb-2">
            Email
          </label>

          <input
            type="email"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-purple-700 text-white"
          />
        </div>
      </div>
    </div>
  </aside>

  {/* Overlay Mobile */}
  {menuOpen && (
    <div
      onClick={() => setMenuOpen(false)}
      className="
        fixed
        inset-0
        bg-black/50
        z-40
      "
    />
  )}

  {/* Conteúdo */}
  <main className="p-6">

    <h2 className="text-white text-3xl font-bold mb-6">
      Horários Disponíveis
    </h2>

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="
            bg-linear-to-br
            from-black
            to-blue-950
            border
            border-purple-800
            rounded-2xl
            p-5
            shadow-xl
          "
        >
          <h3 className="text-white text-xl font-bold">
            Barbeiro: {appointment.barber}
          </h3>

          <p className="text-purple-300 mt-3">
            Data: {appointment.date}
          </p>

          <p className="text-purple-300">
            Horário: {appointment.time}
          </p>

          <button
            className="
              mt-5
              w-full
              py-3
              rounded-lg
              bg-purple-700
              hover:bg-purple-600
              text-white
              font-bold
            "
          >
            Agendar
          </button>
        </div>
      ))}
    </div>
  </main>
</div>
);
}
