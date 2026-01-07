import { ModeToggle } from "@/components/ui/theme-switch";

export default function Register() {
    return (
        <div className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-accent/30 dark:from-primary/15 dark:to-accent/15" />

            <div className="absolute top-4 right-4 z-10">
                <ModeToggle />
            </div>


        </div>
    );
}