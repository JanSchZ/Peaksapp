import { Button } from "@peaks/ui";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                Peaks Coach Dashboard
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
                Welcome to the future of training.
            </p>
            <div className="flex gap-4 mt-8">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
            </div>
        </main>
    );
}
