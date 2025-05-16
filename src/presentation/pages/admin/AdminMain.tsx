export const AdminMain = () => {
  return (
    <main className="p-8 max-w-[1400px] mx-auto w-full flex-1 flex flex-col m-14">
      {/* Panel de Analíticas Globales  */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-2xl border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <i className="ph ph-package text-3xl text-blue-600"></i>
            <span className="text-sm text-gray-500">Este mes</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
            Órdenes Completadas
          </h2>
          <p className="text-3xl font-bold text-blue-600">325</p>
          <div className="flex items-center text-blue-600 mt-2">
            <i className="ph ph-check-circle mr-2"></i>
            <span className="text-sm">+8% rendimiento</span>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-2xl border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <i className="ph ph-users text-3xl text-yellow-600"></i>
            <span className="text-sm text-gray-500">Este mes</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
            Clientes Nuevos
          </h2>
          <p className="text-3xl font-bold text-yellow-500">45</p>
          <div className="flex items-center text-yellow-600 mt-2">
            <i className="ph ph-user-plus mr-2"></i>
            <span className="text-sm">15% crecimiento</span>
          </div>
        </div>
      </section>

      {/* Sección de bienvenida  */}
      <section className="bg-white mt-10 p-10 shadow rounded-lg text-center flex-1 flex items-center justify-center no-select">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">
            Bienvenido a Manos Que Alimentan
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Gestione su negocio de manera eficiente con nuestras herramientas
            avanzadas.
          </p>
        </div>
      </section>
    </main>
  );
};
