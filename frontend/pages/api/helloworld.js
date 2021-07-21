export default function helloWorld(req, res) {
    return res.status(200).json({"Hello": "World"})
}