import { Skeleton } from '@/components/ui/skeleton';

interface iLoadingSpinner {
    message?: string;
    fullScreen?: boolean;
    variant?: 'default' | 'table' | 'form' | 'dashboard';
}

// Table skeleton for DataTable loading
const TableSkeleton = () => (
    <div className="w-full space-y-4">
        {/* Header with search and filters */}
        <div className="flex w-full gap-4 items-center">
            <Skeleton className="flex-1 h-10 bg-gray-100" />
            <Skeleton className="h-10 w-48 bg-gray-100" />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-24 bg-gray-100" />
            <Skeleton className="h-8 w-28 bg-gray-100" />
            <Skeleton className="h-8 w-20 bg-gray-100" />
            <Skeleton className="h-8 w-32 bg-gray-100" />
            <Skeleton className="h-8 w-8 bg-gray-100 rounded-full ml-auto" />
        </div>

        {/* Selection info */}
        <Skeleton className="h-4 w-40 bg-gray-100" />

        {/* Table */}
        <div className="overflow-hidden rounded-md border">
            {/* Table header */}
            <div className="border-b bg-gray-50 p-4">
                <div className="grid grid-cols-7 gap-4">
                    <Skeleton className="h-4 w-4 bg-gray-200" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-4 w-18 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <Skeleton className="h-4 w-12 bg-gray-200" />
                </div>
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border-b p-4">
                    <div className="grid grid-cols-7 gap-4 items-center">
                        <Skeleton className="h-4 w-4 bg-gray-200" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
                            <Skeleton className="h-4 w-24 bg-gray-200" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-md bg-gray-200" />
                        <Skeleton className="h-4 w-20 bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                        <Skeleton className="h-6 w-20 rounded-md bg-gray-200" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-6 bg-gray-200" />
                            <Skeleton className="h-6 w-6 bg-gray-200" />
                            <Skeleton className="h-6 w-6 bg-gray-200" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-48 bg-gray-100" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20 bg-gray-100" />
                <Skeleton className="h-8 w-8 bg-gray-100" />
                <Skeleton className="h-8 w-8 bg-gray-100" />
                <Skeleton className="h-8 w-8 bg-gray-100" />
                <Skeleton className="h-8 w-20 bg-gray-100" />
            </div>
        </div>
    </div>
);

// Form skeleton for Lead Management form
const FormSkeleton = () => (
    <div className="w-full space-y-6">
        {/* Tab navigation */}
        <div className="flex gap-10 border-b border-gray-300 pb-2">
            <Skeleton className="h-6 w-16 bg-gray-200" />
            <Skeleton className="h-6 w-24 bg-gray-200" />
            <Skeleton className="h-6 w-16 bg-gray-200" />
        </div>

        {/* Form fields */}
        <div className="grid gap-6">
            {/* First row */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
            </div>

            {/* Third row */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-18 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
            </div>

            {/* Fourth row */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1 bg-gray-100" />
                        <Skeleton className="h-10 w-16 bg-green-100" />
                    </div>
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1 bg-gray-100" />
                        <Skeleton className="h-10 w-16 bg-green-100" />
                    </div>
                </div>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
            <Skeleton className="h-10 w-20 bg-gray-100" />
            <Skeleton className="h-10 w-40 bg-green-100" />
        </div>
    </div>
);

// Dashboard skeleton
const DashboardSkeleton = () => (
    <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <Skeleton className="h-6 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-100" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-green-100" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 border rounded-lg space-y-3">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                    <Skeleton className="h-3 w-20 bg-gray-100" />
                </div>
            ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-6 w-32 bg-gray-200" />
                <div className="border rounded-lg p-6 space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-32 bg-gray-200" />
                                <Skeleton className="h-3 w-48 bg-gray-100" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-md bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-28 bg-gray-200" />
                <div className="border rounded-lg p-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <Skeleton className="h-4 w-20 bg-gray-200" />
                            <Skeleton className="h-4 w-12 bg-gray-100" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Default simple skeleton
const DefaultSkeleton = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
            <Skeleton className="h-4 w-32 bg-gray-200 mx-auto" />
            <p className="text-sm text-gray-500">{message}</p>
        </div>
    </div>
);

const LoadingSpinner = ({
    message = 'Loading...',
    fullScreen = false,
    variant = 'default'
}: iLoadingSpinner) => {
    const containerClass = `${fullScreen ? 'min-h-screen' : ''} ${fullScreen ? 'flex items-center justify-center' : ''}`;

    const renderSkeleton = () => {
        switch (variant) {
            case 'table':
                return <TableSkeleton />;
            case 'form':
                return <FormSkeleton />;
            case 'dashboard':
                return <DashboardSkeleton />;
            default:
                return <DefaultSkeleton message={message} />;
        }
    };

    return (
        <div className={containerClass}>
            {renderSkeleton()}
        </div>
    );
};

export default LoadingSpinner;