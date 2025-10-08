import { useEffect, useState } from 'react'
import AdminLayout from '@/components/customUI/AdminLayout'
import { ComingSoonNew } from '@/components/customUI/ComingSoon'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, ChevronDown, PlusIcon, TrashIcon } from 'lucide-react'
import { DataTableDemo } from '@/components/customUI/DataTable'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { parseDate } from "chrono-node";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import config from '@/config/config.json';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader } from '@/components/ui/card'

const {
  dropdownOptions: {
    primaryTab, secondaryTab, secondaryTabValues: {
      basicTabs: { gender, height, weight },
      preferencesTabs: { activity, goals, focus, time, intensity, concerns, experience },
      statusTabs: { receptionist, level, status, packages, pt, info }
    }
  }
} = config;

interface iRows {
  id: number;
  text: string;
  dateInput: string;
  date?: Date;
  month?: Date;
  open: boolean
}

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Skeleton className="h-[600px] w-[1000px] rounded-xl flex items-center justify-center text-xl font-bold">
      Loading...
    </Skeleton>
  </div>
)

const LeadManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showBasicTabs, setShowBasicTabs] = useState(false)
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [selectedWeight, setSelectedWeight] = useState<string>("")
  const [selectedHeight, setSelectedHeight] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState(activity[0])
  const [selectedGoals, setSelectedGoals] = useState(goals[0])
  const [selectedFocus, setSelectedFocus] = useState(focus[0])
  const [selectedTime, setSelectedTime] = useState(activity[0])
  const [selectedIntensity, setSelectedIntensity] = useState(intensity[0])
  const [selectedConcern, setSelectedConcern] = useState(concerns[0])
  const [selectedExperience, setSelectedExperience] = useState(experience[0])
  const [selectedReceptionist, setSelectedReceptionist] = useState(receptionist[0])
  const [selectedLevel, setSelectedLevel] = useState(level[0])
  const [selectedStatus, setSelectedStatus] = useState(status[0])
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [selectedPT, setSelectedPT] = useState(pt[0])
  const [selectedInfo, setSelectedInfo] = useState(info[0])
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<iRows[]>([]);

  const today = new Date();
  const [value, setValue] = useState(formatDate(today));
  const [date, setDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState<Date | undefined>(today);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddClick = () => setShowBasicTabs(true)
  const handleUpdateClick = () => setShowBasicTabs(false)

  const required = <span className="text-red-500"> * </span>;

  function formatDate(date: Date | undefined) {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      day: "2-digit", month: "long", year: "numeric"
    })
  }

  const addRow = () => {
    setRows(prev => [
      ...prev,
      { id: Date.now(), text: "", dateInput: "", date: undefined, month: undefined, open: false }
    ])
  };

  const updateRow = (id: number, data: Partial<typeof rows[0]>) => {
    setRows(prev => prev.map(row => (row.id === id ? { ...row, ...data } : row)));
  };

  const deleteRow = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const updateButton = () => (
    <div className="flex justify-center mt-6">
      <Button size="sm" className="w-full max-w-xs" onClick={handleUpdateClick}> Update </Button>
    </div>
  );

  const commonTabStyle = "px-0 py-2 font-semibold text-foreground bg-transparent border-0 border-b-2 border-transparent rounded-none shadow-none focus:outline-0 focus:ring-0 data-[state=active]:text-green-600 data-[state=active]:border-green-600 data-[state=active]:shadow-none"

  if (isLoading) return <Loader />
  return (
    <AdminLayout
      children={
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-xl text-gray-600">Lead Management</span>
            {!showBasicTabs && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="rounded-full flex flex-col gap-8" onClick={handleAddClick}> <PlusIcon /> </Button>
                </TooltipTrigger>
                <TooltipContent> Click here to add new lead </TooltipContent>
              </Tooltip>
            )}
          </div>

          {!showBasicTabs && (
            <Tabs defaultValue="active">
              <TabsList className="justify-start gap-10 bg-transparent p-0 rounded-none border-b border-gray-300">
                {primaryTab.map((data) => (
                  <TabsTrigger key={data} value={data} className={commonTabStyle}>
                    {data.charAt(0).toUpperCase() + data.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="active"> <DataTableDemo /> </TabsContent>
              <TabsContent value="archieved"> <ComingSoonNew /> </TabsContent>
            </Tabs>
          )}

          {showBasicTabs && (
            <Tabs defaultValue="basic">
              <TabsList className="justify-start gap-10 bg-transparent p-0 rounded-none border-b border-gray-300">
                {secondaryTab.map((data) => (
                  <TabsTrigger key={data} value={data} className={commonTabStyle}>
                    {data.charAt(0).toUpperCase() + data.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="basic">
                <div className="w-full max-w-full grid gap-6 mb-6 mt-6">
                  {/* First Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="firstName" className="text-gray-500"> First Name {required} </Label>
                      <Input type="text" id="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="lastName" className="text-gray-500"> Last Name {required} </Label>
                      <Input type="text" id="lastName" />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="phone" className="text-gray-500"> Phone {required} </Label>
                      <Input type="phone" id="phone" placeholder='+91' />
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="email" className="text-gray-500"> Email {required} </Label>
                      <Input type="email" id="email" />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Gender {required} </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedGender} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Gender </DropdownMenuLabel>
                          {gender.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedGender(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Date of Birth {required} </Label>
                      <div className="relative flex gap-2">
                        <Input
                          id="date"
                          value={value}
                          className="bg-background pr-10"
                          onChange={(e) => {
                            setValue(e.target.value)
                            const date = parseDate(e.target.value)
                            if (date) {
                              setDate(date)
                              setMonth(date)
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault()
                              setOpen(true)
                            }
                          }}
                        />
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                              <CalendarIcon className="size-3.5" />
                              <span className="sr-only">Select date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              month={month}
                              onMonthChange={setMonth}
                              onSelect={(date) => {
                                setDate(date)
                                setValue(formatDate(date))
                                setOpen(false)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Fourth Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Height {required} </Label>
                      <div className="grid grid-cols-[1fr_auto] gap-2 w-full">
                        <Input type="height" id="height" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='bg-green-200'>
                              <span className="text-[#28A745]"> {selectedHeight || "cm"} </span>
                              <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel> Height </DropdownMenuLabel>
                            {height.map((data) => (
                              <DropdownMenuItem key={data} onClick={() => setSelectedHeight(data)}> {data} </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Weight {required} </Label>
                      <div className="grid grid-cols-[1fr_auto] gap-2 w-full">
                        <Input type="weight" id="weight" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='bg-green-200'>
                              <span className="text-[#28A745]"> {selectedWeight || "kg"} </span>
                              <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel> Weight </DropdownMenuLabel>
                            {weight.map((data) => (
                              <DropdownMenuItem key={data} onClick={() => setSelectedWeight(data)}> {data} </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
                {updateButton()}
              </TabsContent>

              <TabsContent value="preferences">
                <div className="w-full max-w-full grid gap-6 mb-6 mt-6">
                  {/* First Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Activity Level </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedActivity} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Activity Level </DropdownMenuLabel>
                          {activity.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedActivity(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Wellness Goals </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedGoals} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Wellness Goals </DropdownMenuLabel>
                          {goals.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedGoals(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Primary Fitness Focus </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedFocus} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Primary Fitness Focus </DropdownMenuLabel>
                          {focus.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedFocus(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Preferred Gym Time </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedTime} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Preferred Gym Time </DropdownMenuLabel>
                          {time.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedTime(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Preferred Workout Intensity </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedIntensity} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Preferred Workout Intensity </DropdownMenuLabel>
                          {intensity.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedIntensity(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Medical Concerns </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedConcern} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Medical Concerns </DropdownMenuLabel>
                          {concerns.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedConcern(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Fourth Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Previous Gym Experience </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedExperience} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Previous Gym Experience </DropdownMenuLabel>
                          {experience.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedExperience(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                {updateButton()}
              </TabsContent>

              <TabsContent value="status">
                <div className="w-full max-w-full grid gap-6 mb-6 mt-6">
                  {/* First Row */}
                  <div className="w-full grid grid-cols-2 gap-6">

                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Inquiry Date </Label>
                      <div className="relative flex gap-2">
                        <Input
                          id="date"
                          value={value}
                          className="bg-background pr-10"
                          onChange={(e) => {
                            setValue(e.target.value)
                            const date = parseDate(e.target.value)
                            if (date) {
                              setDate(date)
                              setMonth(date)
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault()
                              setOpen(true)
                            }
                          }}
                        />
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                              <CalendarIcon className="size-3.5" />
                              <span className="sr-only">Select date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              month={month}
                              onMonthChange={setMonth}
                              onSelect={(date) => {
                                setDate(date)
                                setValue(formatDate(date))
                                setOpen(false)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Assigned To Admin/Receptionist </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedReceptionist} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Assigned To Admin/Receptionist </DropdownMenuLabel>
                          {receptionist.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedReceptionist(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Interest Levels </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedLevel} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Interest Levels </DropdownMenuLabel>
                          {level.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedLevel(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Follow Up Status </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedStatus} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Follow Up Status </DropdownMenuLabel>
                          {status.map((status) => (
                            <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}> {status} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Preferred Package </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedPackage} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Preferred Package </DropdownMenuLabel>
                          {packages.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedPackage(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> Preferred PT Package (If Any) </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedPT} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> Preferred PT Package (If Any) </DropdownMenuLabel>
                          {pt.map((concerns) => (
                            <DropdownMenuItem key={concerns} onClick={() => setSelectedPT(concerns)}> {concerns} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Fourth Row */}
                  <div className="w-full grid grid-cols-2 gap-6">
                    <div className="grid w-full items-center gap-3">
                      <Label htmlFor="text" className="text-gray-500"> How They Heard About The Gym </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                            <span> {selectedInfo} </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel> How They Heard About The Gym </DropdownMenuLabel>
                          {info.map((data) => (
                            <DropdownMenuItem key={data} onClick={() => setSelectedInfo(data)}> {data} </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mb-2">
                  <Label htmlFor="text" className="text-gray-500"> Custom notes </Label>
                  <Button size="sm" className="rounded-full flex flex-col gap-8" onClick={addRow}>
                    <PlusIcon />
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {rows.map(row => (
                    <div key={row.id} className="w-full flex items-start gap-6">
                      {/* Date Input + Calendar */}
                      <div className="relative flex-1 flex items-center gap-2">
                        <Input
                          id={`date-${row.id}`}
                          value={row.dateInput}
                          className="bg-background pr-10"
                          onChange={(e) => {
                            const date = parseDate(e.target.value);
                            updateRow(row.id, { dateInput: e.target.value, date: date || undefined, month: date || undefined });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              updateRow(row.id, { open: true });
                            }
                          }}
                        />

                        <Popover open={row.open} onOpenChange={(open) => updateRow(row.id, { open })}>
                          <PopoverTrigger asChild>
                            <Button id={`date-picker-${row.id}`} variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                              <CalendarIcon className="size-3.5" />
                              <span className="sr-only">Select date</span>
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={row.date}
                              captionLayout="dropdown"
                              month={row.month}
                              onMonthChange={(month) => updateRow(row.id, { month })}
                              onSelect={(date) => updateRow(row.id, { date, dateInput: formatDate(date), open: false })}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Independent Textarea */}
                      <Textarea className="flex-1" value={row.text} onChange={(e) => updateRow(row.id, { text: e.target.value })} />

                      <Button size="sm" variant="destructive" onClick={() => deleteRow(row.id)}>
                        <TrashIcon size={16} />
                      </Button>
                    </div>
                  ))}
                </div>

                {updateButton()}

              </TabsContent>
            </Tabs>
          )}
        </div >
      }
    />
  )
}

export default LeadManagement
