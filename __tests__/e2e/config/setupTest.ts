let usermock = {
    id: 1,
    name: 'User Alitec 1',
    email: 'aliancatecnologia.adm@gmail.com',
    password: '123456',
    role: "USER",
    admin_user: 1
};

let taskMock = {
    title: "Dummy Task",
    description: "A task To create something",
    timestamp: Date.now().toLocaleString,
    user_id: 1,
    id: 1
}

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn(() => {
            return "9u3iuh4w8y3h8wy43w8dTestToken";
        })
    }
})

jest.mock('../../../src/middlewares/authHandler', () => {
    return {
        verifyToken: jest.fn((req, res, next) => {
            req.headers['user_id'] = 1;
            next();
        })
    }
})

jest.mock('../../../src/client', () => {
    return {
        user: {
            findMany: jest.fn(() => {
                return [
                    usermock
                ]
            }),
            findFirst: jest.fn(() => {
                return usermock
            }),
            create: jest.fn(({
                data, select
            }) => {
                usermock = { id: usermock.id, ...data }
                return usermock
            }),
            update: jest.fn(({
                where, data, select
            }) => {
                usermock = { id: usermock.id, ...data }
                return usermock;
            }),
            delete: jest.fn(({
                where
            }) => {
                return usermock
            })
        },
        task: {
            findMany: jest.fn(() => {
                return [
                    taskMock
                ]
            }),
            create: jest.fn(({
                data, select
            }) => {
                taskMock = { id: taskMock.id, ...data }
                return taskMock
            }),
            update: jest.fn(({
                where, data, select
            }) => {
                taskMock = { id: taskMock.id, ...data }
                return taskMock
            }),
            delete: jest.fn(({
                where
            }) => {
                return taskMock
            })
        }
    }
});