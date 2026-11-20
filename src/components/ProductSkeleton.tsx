const ProductSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="aspect-[3/4] bg-gray-200" />

            <div className="pt-4 space-y-3">
                <div className="h-3 w-1/3 bg-gray-200 rounded" />

                <div className="h-4 w-3/4 bg-gray-200 rounded" />

                <div className="h-4 w-1/4 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export default ProductSkeleton;