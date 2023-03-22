import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Prisma middleware for query logging. Useful to implement notifications.
prisma.$use(async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    if (params.model === 'Task' && params.action == 'create') {
        const task = params.args.data
        const user = await prisma.user.findFirst({
            where: {
                id: task.user_id
            }
        });
        console.log(`${user.name} create the task: ${task.title}`)
    }

    return result
})

export default prisma