



from typing import List


class Task(): 
    name: str 
    time_start: int
    time_end: int
    running: bool = False

    def __init__(self, name, time_start, time_end, running):
        self.name = name
        self.time_start = time_start
        self.time_end = time_end
        self.running = running

    def __str__(self):
        return f"{self.name}"

    def __repr__(self):
        return self.__str__()


task_array: List[Task] = [
    Task("A", 0, 2, True),
    Task("B", 1, 3, True),
    Task("C", 2, 5, True),
    Task("D", 3, 6, True),
    Task("E", 4, 7, False),
#    Task("F", 4, 7, False),
#    Task("G", 4, 7, False),
#    Task("H", 4, 7, False),
]



def select_most_waiting_task():
    min_time: int = 999999
    selected_task: int = None

    for i, task in enumerate(task_array):
        if not task.running:
            if task.time_end < min_time:
                min_time = task.time_end
                selected_task = i

    return selected_task

cpu_array = [0,1,2,3]

def select_most_active_cpu():
    max_time: int = 999999
    selected_cpu: int = None

    for i, tid in enumerate(cpu_array):
        task = task_array[tid]
        if task.time_start < max_time:
            max_time = task.time_start
            selected_cpu = i

    return selected_cpu

curr_tick = 0

def schedule_round_robin(): 
    for i in range(len(cpu_array)):
        task_id = (curr_tick + i * (len(task_array)//len(cpu_array))) % len(task_array)

        task_array[task_id].running = True
        task_array[task_id].time_start = curr_tick 
        
        task_array[cpu_array[i]].running = False
        task_array[cpu_array[i]].time_end = curr_tick

        # context switch
        cpu_array[i] = task_id


        

def schedule(): 
    if len(task_array) < len(cpu_array):
        return
    
    context_switch = min(len(task_array) - len(cpu_array), len(cpu_array))

    if context_switch == len(cpu_array):
        schedule_round_robin()
        return
    
    for i in range(context_switch):
        task_id = select_most_waiting_task()
        cpu_id = select_most_active_cpu()

        if task_id is None or cpu_id is None:
            return

        task_array[task_id].running = True
        task_array[task_id].time_start = curr_tick 
        
        task_array[cpu_array[cpu_id]].running = False
        task_array[cpu_array[cpu_id]].time_end = curr_tick

        # context switch
        cpu_array[cpu_id] = task_id

    heaviest_cpu = max(cpu_array, key=lambda x:- task_array[x].time_start)
    print("heaviest_cpu: ", heaviest_cpu)



while True:
    schedule()
    curr_tick += 1
    
    print("tick: {}", curr_tick)
    print("cpu_array: {}", cpu_array)