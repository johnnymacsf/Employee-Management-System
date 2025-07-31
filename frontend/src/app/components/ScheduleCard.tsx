import { Schedule } from "../lib/types/Schedule";
import { deleteSchedule } from "../lib/api";
interface Props {
    schedule: Schedule;
    onEdit: (schedule: Schedule) => void;
    onDelete: () => void;
}

export default function ScheduleCard({ schedule, onEdit, onDelete } : Props) {
    const { employee, startTime, endTime, role, hasLunch} = schedule;

    const handleDelete = async () => {
        await deleteSchedule(schedule.id);
        onDelete();
    }
    return (
        <div className="relative bg-white p-6 rounded-2xl shadow-md border border-black text-black">
            <div className="absolute top-2 left-2 text-red-500 font-bold text-lg cursor-pointer" title="Delete" onClick={handleDelete}>
                X
            </div>
            <div className="absolute top-2 right-2 text-blue-500 font-bold text-lg cursor-pointer" title="Modify" onClick={() => onEdit(schedule)}>
                ⚙
            </div>
            <div className="text-center mt-6 mb-4">
                <h2 className="text-xl font-bold underline">{employee.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-md">
                <div>
                    <p>
                        <span className="font-semibold">Start: </span>
                        <span>{schedule.startTime}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">End: </span>
                        <span>{schedule.endTime}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Role: </span>
                        <span>{schedule.role}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Lunch: </span>
                        <span>{schedule.hasLunch ? "Yes" : "No"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}