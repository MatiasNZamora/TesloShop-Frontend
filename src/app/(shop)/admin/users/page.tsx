// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { redirect } from 'next/navigation';
import { getPaginatedUsers } from '../../../../actions';
import { Pagination, Title } from '../../../../components';
import { titleFont } from '../../../../config/fonts';
import { UserTable } from './ui/UserTable';

export default async function OrdersPage() {

    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) { redirect('/auth/login') };

    return (
        <>
            <Title title="Mantenimiento de Usuarios" className={titleFont.className} />
            <div className="mb-10">
                <UserTable users={ users }/>

                <Pagination totalPages={ 1 } /> 
            </div>
        </>
    );
}