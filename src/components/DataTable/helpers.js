export function getImageUrlForDataTable(row) {
    const url = row.images?.[0]?.fileUrl;
    if (url) {
        return url;
    }
    return "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
}
