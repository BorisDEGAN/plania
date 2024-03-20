export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    return (
        <div>Project: {id}</div>
    );
}
