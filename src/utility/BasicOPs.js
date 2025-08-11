export default function BasicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize) {
    if (!products) {
        return { filteredSortedGroupArr: [], totalPages: 0 };
    }


    // Search filter
    let filteredArr = products;
    if (searchTerm) {
        filteredArr = filteredArr.filter((product) => {
            let lowerTitle = (product.title || "").toLowerCase();
            let lowerSearchTerm = searchTerm.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        });
    }

    // Sorting
    let filteredSortedArr = [...filteredArr];
    if (sortDir !== 0) {
        if (sortDir === 1) {
            filteredSortedArr.sort(aO);
        } else {
            filteredSortedArr.sort(dO);
        }
    }

    // Category filter
    let filteredSortedGroupArr = filteredSortedArr;
    if (currCategory && currCategory !== "All categories") {
        filteredSortedGroupArr = filteredSortedGroupArr.filter((product) => {
            return product.category === currCategory;
        });
    }

    // Pagination
    let totalPages = Math.ceil(filteredSortedGroupArr.length / pageSize);
    let sidx = (pageNum - 1) * pageSize;
    let eidx = sidx + pageSize;
    filteredSortedGroupArr = filteredSortedGroupArr.slice(sidx, eidx);

    return { filteredSortedGroupArr, totalPages };
}

function aO(product1, product2) {
    return product1.price > product2.price ? 1 : -1;
}

function dO(product1, product2) {
    return product1.price < product2.price ? 1 : -1;
}

