import prisma from "../client";

async function main() {
    await prisma.user.create({
        data: {
            name: 'Fredson Rodrigues',
            email: 'fredson.rodrigues.principal@gmail.com',
            password: '123456',
            role: "ADMIN",
            admin_user: 0
        }
    })
    await prisma.user.create({
        data: {
            name: 'User Alitec',
            email: 'aliancatecnologia.adm@gmail.com',
            password: '123456',
            role: "USER",
            admin_user: 1
        }
    })
    const allUsers = await prisma.user.findMany();
    console.log('User seed created.')
    console.log(allUsers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })