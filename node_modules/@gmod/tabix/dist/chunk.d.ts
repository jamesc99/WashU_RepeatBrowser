import VirtualOffset from './virtualOffset';
export default class Chunk {
    minv: VirtualOffset;
    maxv: VirtualOffset;
    bin: number;
    _fetchedSize?: number;
    /**
     * @param {VirtualOffset} minv
     * @param {VirtualOffset} maxv
     * @param {number} bin
     * @param {number} [fetchedSize]
     */
    constructor(minv: VirtualOffset, maxv: VirtualOffset, bin: number, fetchedSize?: undefined);
    toUniqueString(): string;
    toString(): string;
    compareTo(b: Chunk): number;
    fetchedSize(): number;
}
