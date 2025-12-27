import { redirect } from 'next/navigation';
import Image from 'next/image';
import { auth } from '../../../auth.config';
import { Title } from '../../../components/ui/title/Title';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/');

  const { name, email, role, image } = session.user;

  /* 🔧 Mock temporal — luego viene del backend */
  const mainAddress = {
    street: 'Av. Siempre Viva 742',
    city: 'La Rioja',
    province: 'La Rioja',
    zip: '5300',
    country: 'Argentina',
  };

  const lastOrders = [
    {
      id: 'ORD-1023',
      date: '12/12/2025',
      total: '$45.300',
      status: 'Entregado',
    },
    {
      id: 'ORD-1011',
      date: '02/12/2025',
      total: '$18.900',
      status: 'En camino',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Title title="Mi cuenta" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <aside className="md:col-span-1 bg-neutral-100 rounded-xl p-5">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3">
              <Image
                src={image ?? '/avatar-placeholder.png'}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <nav className="mt-6 space-y-2 text-sm">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-white shadow-sm">
              Perfil
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white">
              Mis pedidos
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white">
              Direcciones
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white">
              Seguridad
            </button>
          </nav>
        </aside>

        {/* CONTENIDO */}
        <section className="md:col-span-3 space-y-8">

          {/* DATOS PERSONALES */}
          <Card title="Datos personales" badge={role}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Nombre" value={name} />
              <ProfileField label="Correo electrónico" value={email} />
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
                Editar información
              </button>

              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </Card>

          {/* DIRECCIÓN PRINCIPAL */}
          <Card title="Dirección principal">
            <p className="font-medium">{mainAddress.street}</p>
            <p className="text-sm text-gray-600">
              {mainAddress.city}, {mainAddress.province}
            </p>
            <p className="text-sm text-gray-600">
              {mainAddress.zip} · {mainAddress.country}
            </p>

            <button className="mt-4 text-sm underline hover:text-gray-700">
              Editar dirección
            </button>
          </Card>

          {/* ÚLTIMOS PEDIDOS */}
          <Card title="Últimos pedidos">
            <div className="space-y-4">
              {lastOrders.map(order => (
                <div
                  key={order.id}
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-100">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 text-sm underline hover:text-gray-700">
              Ver todos los pedidos
            </button>
          </Card>
        </section>
      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function ProfileField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value ?? '—'}</p>
    </div>
  );
}

function Card({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {badge && (
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
