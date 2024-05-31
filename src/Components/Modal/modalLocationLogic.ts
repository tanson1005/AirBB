import { ILocationItem } from '../../constant/constant';

export const filterLocations = (listData: ILocationItem[], inputValue: string): ILocationItem[] => {
    const revertValueInput = inputValue.toLowerCase().trim();
    return listData.filter((item: ILocationItem) => 
        item?.tinhThanh?.toLowerCase().includes(revertValueInput)
    );
};
