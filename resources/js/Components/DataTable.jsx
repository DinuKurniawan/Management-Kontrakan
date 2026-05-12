import { router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { SearchInput, Pagination, EmptyState, Button } from './UI';
import { Plus, Search } from 'lucide-react';

export default function DataTable({ columns, data, pagination, filters = {}, searchRoute, createRoute, createLabel = 'Tambah', actions, emptyMessage = 'Tidak ada data.' }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = useCallback((value) => {
        setSearch(value);
        if (searchRoute) {
            router.get(searchRoute, { ...filters, search: value }, { preserveState: true, replace: true });
        }
    }, [searchRoute, filters]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <SearchInput value={search} onChange={handleSearch} />
                </div>
                {createRoute && (
                    <a href={createRoute}>
                        <Button><Plus size={16} /> {createLabel}</Button>
                    </a>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                {columns.map((col, i) => (
                                    <th key={i} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{col.label}</th>
                                ))}
                                {actions && <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr><td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-slate-400">{emptyMessage}</td></tr>
                            ) : (
                                data.map((row, i) => (
                                    <tr key={row.id || i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        {columns.map((col, j) => (
                                            <td key={j} className="px-4 py-3 text-slate-700">{col.render ? col.render(row) : row[col.key]}</td>
                                        ))}
                                        {actions && <td className="px-4 py-3 text-right">{actions(row)}</td>}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination && <Pagination links={pagination.links} />}
        </div>
    );
}
