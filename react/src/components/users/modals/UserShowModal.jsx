import UserModalTitle from "./UserModalTitle"

export default function UserShowModal({ user }) {



    return (
        <>
            <UserModalTitle userPreview={user.image} title="User Profile" />
            <div className="flex flex-col flex-wrap gap-2">
                <div className="flex gap-2 flex-wrap items-center ">
                    <p className="md:text-2xl font-semibold">Name - Surname:</p>
                    <p className="md:text-2xl">{user.name}</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center ">
                    <p className="md:text-2xl font-semibold">E-mail:</p>
                    <p className="md:text-2xl">{user.email}</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center ">
                    <p className="md:text-2xl font-semibold">Telephone:</p>
                    <p className="md:text-2xl">{user.telephone}</p>
                </div>
            </div>
        </>
    )
}
