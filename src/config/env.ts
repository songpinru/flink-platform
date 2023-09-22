interface Env {
    [name: string]: { url: string }
}

const env: Env = {
    test: {
        url: "/api"
    },
    prod: {
        url: "/localhost:8080"
    }
}
export default env;