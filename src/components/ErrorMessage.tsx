export default function ErrorMessage({ message }: { message: string }) {
    if (!message) return null;
    return (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-3 mb-4"> 
            {message}
        </div>
    );
}

