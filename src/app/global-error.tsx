'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <h2>Something went wrong!</h2>
                {JSON.stringify(error)}
                <button type="button" onClick={() => reset()}>Try again</button>
                <div>
                    error
                </div>
            </body>
        </html>
    )
}