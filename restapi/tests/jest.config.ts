export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["server.ts", "products_router.ts", "orders_router.ts", "users_router.ts"]
}