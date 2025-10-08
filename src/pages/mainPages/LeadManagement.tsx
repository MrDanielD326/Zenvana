import { useEffect, useState } from 'react'
import AdminLayout from '@/components/customUI/AdminLayout'
import { ComingSoonNew } from '@/components/customUI/ComingSoon'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, ChevronDown, PlusIcon, TrashIcon } from 'lucide-react'
import { DataTableDemo, type iLead } from '@/components/customUI/DataTable'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { parseDate } from "chrono-node";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import config from '@/config/config.json';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { LoadingSpinner } from '@/components/common'
import { STORAGE_KEYS, formatDate, getToday } from '@/utils'
import { sampleLeads } from '@/data/sampleLeads'

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

interface iLeadFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  activityLevel: string;
  wellnessGoals: string;
  primaryFitnessFocus: string;
  preferredGymTime: string;
  workoutIntensity: string;
  medicalConcerns: string;
  gymExperience: string;
  inquiryDate: string;
  assignedTo: string;
  interestLevel: string;
  followUpStatus: string;
  preferredPackage: string;
  ptPackage: string;
  howHeardAboutGym: string;
  customNotes: iRows[];
}

// Extended lead interface that includes all form data
interface iCompleteLeadData extends iLead {
  formData: iLeadFormData;
}



const LeadManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [showBasicTabs, setShowBasicTabs] = useState(false)
  const [leads, setLeads] = useState<iLead[]>([])
  const [completeLeadsData, setCompleteLeadsData] = useState<iCompleteLeadData[]>([])
  const [dobOpen, setDobOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [rows, setRows] = useState<iRows[]>([]);
  const [currentTab, setCurrentTab] = useState('basic')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null)

  const today = getToday();
  const [dobDate, setDobDate] = useState<Date | undefined>(today);
  const [dobMonth, setDobMonth] = useState<Date | undefined>(today);
  const [inquiryDate, setInquiryDate] = useState<Date | undefined>(today);
  const [inquiryMonth, setInquiryMonth] = useState<Date | undefined>(today);

  // Form state
  const [formData, setFormData] = useState<iLeadFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    dateOfBirth: formatDate(today),
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    activityLevel: activity[0] || '',
    wellnessGoals: goals[0] || '',
    primaryFitnessFocus: focus[0] || '',
    preferredGymTime: time[0] || '',
    workoutIntensity: intensity[0] || '',
    medicalConcerns: concerns[0] || '',
    gymExperience: experience[0] || '',
    inquiryDate: formatDate(today),
    assignedTo: receptionist[0] || '',
    interestLevel: level[0] || '',
    followUpStatus: status[0] || '',
    preferredPackage: packages[0] || '',
    ptPackage: pt[0] || '',
    howHeardAboutGym: info[0] || '',
    customNotes: []
  });

  useEffect(() => {
    // Load complete leads data from session storage
    const savedCompleteLeads = sessionStorage.getItem(STORAGE_KEYS.COMPLETE_LEADS_DATA)
    if (savedCompleteLeads) {
      const completeData = JSON.parse(savedCompleteLeads)
      setCompleteLeadsData(completeData)
      // Extract basic lead data for the table
      setLeads(completeData.map((lead: iCompleteLeadData) => ({
        id: lead.id,
        name: lead.name,
        interest: lead.interest,
        assignedTo: lead.assignedTo,
        lastInteraction: lead.lastInteraction,
        followUp: lead.followUp
      })))
    } else {
      // Use sample data if no saved data exists
      setLeads(sampleLeads)
    }

    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Save complete leads data to session storage whenever it changes
  useEffect(() => {
    if (completeLeadsData.length > 0) {
      sessionStorage.setItem(STORAGE_KEYS.COMPLETE_LEADS_DATA, JSON.stringify(completeLeadsData))
    }
  }, [completeLeadsData])

  const handleAddClick = () => {
    setIsEditMode(false)
    setEditingLeadId(null)
    setCurrentTab('basic')
    setShowBasicTabs(true)
  }

  const handleEditLead = (lead: iLead) => {
    // Find the complete lead data
    const completeLeadData = completeLeadsData.find(completeLead => completeLead.id === lead.id)

    console.log('Editing lead:', lead)
    console.log('Found complete data:', completeLeadData)
    console.log('All complete leads data:', completeLeadsData)

    setIsEditMode(true)
    setEditingLeadId(lead.id)
    setCurrentTab('basic')

    if (completeLeadData && completeLeadData.formData) {
      // Populate form with complete stored data
      console.log('Loading form data:', completeLeadData.formData)
      setFormData(completeLeadData.formData)
      setRows(completeLeadData.formData.customNotes || [])

      // Update date states for calendar components
      const parsedDobDate = parseDate(completeLeadData.formData.dateOfBirth)
      if (parsedDobDate) {
        setDobDate(parsedDobDate)
        setDobMonth(parsedDobDate)
      }

      // Update inquiry date
      const parsedInquiryDate = parseDate(completeLeadData.formData.inquiryDate)
      if (parsedInquiryDate) {
        setInquiryDate(parsedInquiryDate)
        setInquiryMonth(parsedInquiryDate)
      }
    } else {
      // Fallback to basic data if complete data not found
      setFormData(prev => ({
        ...prev,
        firstName: lead.name.split(' ')[0] || '',
        lastName: lead.name.split(' ').slice(1).join(' ') || '',
        assignedTo: lead.assignedTo,
        inquiryDate: lead.lastInteraction,
        followUpStatus: lead.followUp,
        interestLevel: lead.interest === 'Hot' ? 'High' : lead.interest === 'Warm' ? 'Medium' : 'Low'
      }))
    }

    setShowBasicTabs(true)
  }

  // Validation functions for each tab
  const validateBasicTab = () => {
    return formData.firstName && formData.lastName && formData.phone &&
      formData.email && formData.gender && formData.height && formData.weight
  }

  const validatePreferencesTab = () => {
    return formData.activityLevel && formData.wellnessGoals &&
      formData.primaryFitnessFocus && formData.preferredGymTime &&
      formData.workoutIntensity && formData.medicalConcerns && formData.gymExperience
  }

  const validateStatusTab = () => {
    return formData.inquiryDate && formData.assignedTo &&
      formData.interestLevel && formData.followUpStatus
  }

  const handleNextTab = () => {
    if (currentTab === 'basic' && validateBasicTab()) {
      setIsFormLoading(true)
      setTimeout(() => {
        setCurrentTab('preferences')
        setIsFormLoading(false)
      }, 300)
    } else if (currentTab === 'preferences' && validatePreferencesTab()) {
      setIsFormLoading(true)
      setTimeout(() => {
        setCurrentTab('status')
        setIsFormLoading(false)
      }, 300)
    } else if (currentTab === 'status' && validateStatusTab()) {
      handleFormSubmit()
    } else {
      const missingFields = []
      if (currentTab === 'basic') {
        if (!formData.firstName.trim()) missingFields.push('First Name')
        if (!formData.lastName.trim()) missingFields.push('Last Name')
        if (!formData.phone.trim()) missingFields.push('Phone')
        if (!formData.email.trim()) missingFields.push('Email')
        if (!formData.gender) missingFields.push('Gender')
        if (!formData.height) missingFields.push('Height')
        if (!formData.weight) missingFields.push('Weight')
      } else if (currentTab === 'preferences') {
        if (!formData.activityLevel) missingFields.push('Activity Level')
        if (!formData.wellnessGoals) missingFields.push('Wellness Goals')
        if (!formData.primaryFitnessFocus) missingFields.push('Primary Fitness Focus')
        if (!formData.preferredGymTime) missingFields.push('Preferred Gym Time')
        if (!formData.workoutIntensity) missingFields.push('Workout Intensity')
        if (!formData.medicalConcerns) missingFields.push('Medical Concerns')
        if (!formData.gymExperience) missingFields.push('Gym Experience')
      } else if (currentTab === 'status') {
        if (!formData.inquiryDate) missingFields.push('Inquiry Date')
        if (!formData.assignedTo) missingFields.push('Assigned To')
        if (!formData.interestLevel) missingFields.push('Interest Level')
        if (!formData.followUpStatus) missingFields.push('Follow Up Status')
      }

      // Create a more user-friendly error message
      const errorMessage = `Please fill in the following required fields:\n• ${missingFields.join('\n• ')}`
      alert(errorMessage)
    }
  }

  const handleFormSubmit = () => {
    // Final validation
    if (!validateBasicTab() || !validatePreferencesTab() || !validateStatusTab()) {
      alert('Please fill in all required fields')
      return
    }

    setIsFormLoading(true)

    const leadId = isEditMode ? editingLeadId! : String(Date.now())

    const leadData: iLead = {
      id: leadId,
      name: `${formData.firstName} ${formData.lastName}`,
      interest: formData.interestLevel === 'High' ? 'Hot' : formData.interestLevel === 'Medium' ? 'Warm' : 'Cold',
      assignedTo: formData.assignedTo,
      lastInteraction: formData.inquiryDate,
      followUp: formData.followUpStatus
    }

    // Create complete lead data with form data
    const completeLeadData: iCompleteLeadData = {
      ...leadData,
      formData: { ...formData, customNotes: rows }
    }

    console.log('Saving complete lead data:', completeLeadData)

    if (isEditMode) {
      // Update existing lead in both arrays
      setLeads(prev => prev.map(lead =>
        lead.id === editingLeadId ? leadData : lead
      ))
      setCompleteLeadsData(prev => prev.map(completeLead =>
        completeLead.id === editingLeadId ? completeLeadData : completeLead
      ))
    } else {
      // Add new lead to both arrays
      setLeads(prev => [...prev, leadData])
      setCompleteLeadsData(prev => [...prev, completeLeadData])
    }

    // Reset form and go back to table view
    setTimeout(() => {
      resetForm()
      setShowBasicTabs(false)
      setIsFormLoading(false)
    }, 500)
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: '',
      dateOfBirth: formatDate(today),
      height: '',
      heightUnit: 'cm',
      weight: '',
      weightUnit: 'kg',
      activityLevel: activity[0] || '',
      wellnessGoals: goals[0] || '',
      primaryFitnessFocus: focus[0] || '',
      preferredGymTime: time[0] || '',
      workoutIntensity: intensity[0] || '',
      medicalConcerns: concerns[0] || '',
      gymExperience: experience[0] || '',
      inquiryDate: formatDate(today),
      assignedTo: receptionist[0] || '',
      interestLevel: level[0] || '',
      followUpStatus: status[0] || '',
      preferredPackage: packages[0] || '',
      ptPackage: pt[0] || '',
      howHeardAboutGym: info[0] || '',
      customNotes: []
    })
    setRows([])
    setDobDate(today)
    setDobMonth(today)
    setInquiryDate(today)
    setInquiryMonth(today)
    setCurrentTab('basic')
    setIsEditMode(false)
    setEditingLeadId(null)
  }

  const updateFormData = (field: keyof iLeadFormData, value: string | iRows[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const required = <span className="text-red-500"> * </span>;



  const addRow = () => {
    const newRow = { id: Date.now(), text: "", dateInput: "", date: undefined, month: undefined, open: false };
    setRows(prev => [...prev, newRow]);
    updateFormData('customNotes', [...formData.customNotes, newRow]);
  };

  const updateRow = (id: number, data: Partial<iRows>) => {
    setRows(prev => {
      const updated = prev.map(row => (row.id === id ? { ...row, ...data } : row));
      updateFormData('customNotes', updated);
      return updated;
    });
  };

  const deleteRow = (id: number) => {
    setRows(prev => {
      const filtered = prev.filter(row => row.id !== id);
      updateFormData('customNotes', filtered);
      return filtered;
    });
  };

  const updateButton = () => {
    const getButtonText = () => {
      if (currentTab === 'basic') return 'Next: Preferences'
      if (currentTab === 'preferences') return 'Next: Status'
      return isEditMode ? 'Update Lead' : 'Save Lead'
    }

    const canProceed = () => {
      if (currentTab === 'basic') return validateBasicTab()
      if (currentTab === 'preferences') return validatePreferencesTab()
      return validateStatusTab()
    }

    return (
      <div className="flex justify-center mt-6 gap-4">
        <Button size="sm" variant="outline" onClick={() => setShowBasicTabs(false)}> Cancel </Button>
        {currentTab !== 'basic' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (currentTab === 'preferences') setCurrentTab('basic')
              else if (currentTab === 'status') setCurrentTab('preferences')
            }}
          >
            Previous
          </Button>
        )}
        <Button
          size="sm"
          className="w-full max-w-xs"
          onClick={handleNextTab}
          disabled={!canProceed()}
        >
          {getButtonText()}
        </Button>
      </div>
    )
  };

  const commonTabStyle = "px-0 py-2 font-semibold text-foreground bg-transparent border-0 border-b-2 border-transparent rounded-none shadow-none focus:outline-0 focus:ring-0 data-[state=active]:text-green-600 data-[state=active]:border-green-600 data-[state=active]:shadow-none"

  if (isLoading) return <LoadingSpinner fullScreen variant="table" message="Loading Lead Management..." />
  return (
    <AdminLayout
      children={
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="font-semibold text-xl text-gray-600"> Lead Management </span>
            </div>

            {!showBasicTabs && (
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="rounded-full flex flex-col gap-8" onClick={handleAddClick}> <PlusIcon /> </Button>
                  </TooltipTrigger>
                  <TooltipContent> Click here to add new lead </TooltipContent>
                </Tooltip>
              </div>
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
              <TabsContent value="active"> <DataTableDemo data={leads} onEditLead={handleEditLead} /> </TabsContent>
              <TabsContent value="archieved"> <ComingSoonNew /> </TabsContent>
            </Tabs>
          )}

          {showBasicTabs && (
            <div className="space-y-4">
              {isFormLoading ? (
                <LoadingSpinner variant="form" message="Loading form..." />
              ) : (
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="justify-start gap-10 bg-transparent p-0 rounded-none border-b border-gray-300">
                    {secondaryTab.map((data) => (
                      <TabsTrigger
                        key={data}
                        value={data}
                        className={commonTabStyle}
                        disabled={
                          (data === 'preferences' && !validateBasicTab()) ||
                          (data === 'status' && (!validateBasicTab() || !validatePreferencesTab()))
                        }
                      >
                        <span className="flex items-center gap-2">
                          {data.charAt(0).toUpperCase() + data.slice(1)}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="basic">
                    <div className="w-full max-w-full grid gap-6 mb-6 mt-6">
                      {/* First Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="firstName" className="text-gray-500"> First Name {required} </Label>
                          <Input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                          />
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="lastName" className="text-gray-500"> Last Name {required} </Label>
                          <Input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Second Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="phone" className="text-gray-500"> Phone {required} </Label>
                          <Input
                            type="phone"
                            id="phone"
                            placeholder='+91'
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                          />
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="email" className="text-gray-500"> Email {required} </Label>
                          <Input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Third Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Gender {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.gender || 'Select Gender'} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Gender </DropdownMenuLabel>
                              {gender.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('gender', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Date of Birth {required} </Label>
                          <div className="relative flex gap-2">
                            <Input
                              id="date"
                              value={formData.dateOfBirth}
                              className="bg-background pr-10"
                              onChange={(e) => {
                                updateFormData('dateOfBirth', e.target.value)
                                const date = parseDate(e.target.value)
                                if (date) {
                                  setDobDate(date)
                                  setDobMonth(date)
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                  e.preventDefault()
                                  setDobOpen(true)
                                }
                              }}
                            />
                            <Popover open={dobOpen} onOpenChange={setDobOpen}>
                              <PopoverTrigger asChild>
                                <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                  <CalendarIcon className="size-3.5" />
                                  <span className="sr-only">Select date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                <Calendar
                                  mode="single"
                                  selected={dobDate}
                                  captionLayout="dropdown"
                                  month={dobMonth}
                                  onMonthChange={setDobMonth}
                                  onSelect={(date) => {
                                    setDobDate(date)
                                    updateFormData('dateOfBirth', formatDate(date))
                                    setDobOpen(false)
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
                            <Input
                              type="number"
                              id="height"
                              value={formData.height}
                              onChange={(e) => updateFormData('height', e.target.value)}
                            />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className='bg-green-200'>
                                  <span className="text-[#28A745]"> {formData.heightUnit} </span>
                                  <ChevronDown size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel> Height </DropdownMenuLabel>
                                {height.map((data) => (
                                  <DropdownMenuItem key={data} onClick={() => updateFormData('heightUnit', data)}> {data} </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Weight {required} </Label>
                          <div className="grid grid-cols-[1fr_auto] gap-2 w-full">
                            <Input
                              type="number"
                              id="weight"
                              value={formData.weight}
                              onChange={(e) => updateFormData('weight', e.target.value)}
                            />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className='bg-green-200'>
                                  <span className="text-[#28A745]"> {formData.weightUnit} </span>
                                  <ChevronDown size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel> Weight </DropdownMenuLabel>
                                {weight.map((data) => (
                                  <DropdownMenuItem key={data} onClick={() => updateFormData('weightUnit', data)}> {data} </DropdownMenuItem>
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
                          <Label htmlFor="text" className="text-gray-500"> Activity Level {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.activityLevel} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Activity Level </DropdownMenuLabel>
                              {activity.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('activityLevel', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Wellness Goals {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.wellnessGoals} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Wellness Goals </DropdownMenuLabel>
                              {goals.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('wellnessGoals', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Second Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Primary Fitness Focus {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.primaryFitnessFocus} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Primary Fitness Focus </DropdownMenuLabel>
                              {focus.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('primaryFitnessFocus', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Preferred Gym Time {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.preferredGymTime} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Preferred Gym Time </DropdownMenuLabel>
                              {time.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('preferredGymTime', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Third Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Preferred Workout Intensity {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.workoutIntensity} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Preferred Workout Intensity </DropdownMenuLabel>
                              {intensity.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('workoutIntensity', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Medical Concerns {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.medicalConcerns} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Medical Concerns </DropdownMenuLabel>
                              {concerns.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('medicalConcerns', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Fourth Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Previous Gym Experience {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.gymExperience} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Previous Gym Experience </DropdownMenuLabel>
                              {experience.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('gymExperience', data)}> {data} </DropdownMenuItem>
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
                          <Label htmlFor="text" className="text-gray-500"> Inquiry Date {required} </Label>
                          <div className="relative flex gap-2">
                            <Input
                              id="inquiryDate"
                              value={formData.inquiryDate}
                              className="bg-background pr-10"
                              onChange={(e) => {
                                updateFormData('inquiryDate', e.target.value)
                                const date = parseDate(e.target.value)
                                if (date) {
                                  setInquiryDate(date)
                                  setInquiryMonth(date)
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                  e.preventDefault()
                                  setInquiryOpen(true)
                                }
                              }}
                            />
                            <Popover open={inquiryOpen} onOpenChange={setInquiryOpen}>
                              <PopoverTrigger asChild>
                                <Button id="inquiry-date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                  <CalendarIcon className="size-3.5" />
                                  <span className="sr-only">Select date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                <Calendar
                                  mode="single"
                                  selected={inquiryDate}
                                  captionLayout="dropdown"
                                  month={inquiryMonth}
                                  onMonthChange={setInquiryMonth}
                                  onSelect={(date) => {
                                    setInquiryDate(date)
                                    updateFormData('inquiryDate', formatDate(date))
                                    setInquiryOpen(false)
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Assigned To Admin/Receptionist {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.assignedTo} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Assigned To Admin/Receptionist </DropdownMenuLabel>
                              {receptionist.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('assignedTo', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Second Row */}
                      <div className="w-full grid grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Interest Levels {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.interestLevel} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Interest Levels </DropdownMenuLabel>
                              {level.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('interestLevel', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Follow Up Status {required} </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.followUpStatus} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Follow Up Status </DropdownMenuLabel>
                              {status.map((status) => (
                                <DropdownMenuItem key={status} onClick={() => updateFormData('followUpStatus', status)}> {status} </DropdownMenuItem>
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
                                <span> {formData.preferredPackage} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Preferred Package </DropdownMenuLabel>
                              {packages.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('preferredPackage', data)}> {data} </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full items-center gap-3">
                          <Label htmlFor="text" className="text-gray-500"> Preferred PT Package (If Any) </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="font-semibold bg-white text-gray-700 flex justify-between items-center">
                                <span> {formData.ptPackage} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> Preferred PT Package (If Any) </DropdownMenuLabel>
                              {pt.map((concerns) => (
                                <DropdownMenuItem key={concerns} onClick={() => updateFormData('ptPackage', concerns)}> {concerns} </DropdownMenuItem>
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
                                <span> {formData.howHeardAboutGym} </span>
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel> How They Heard About The Gym </DropdownMenuLabel>
                              {info.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateFormData('howHeardAboutGym', data)}> {data} </DropdownMenuItem>
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
            </div>
          )}
        </div>
      }
    />
  )
}

export default LeadManagement
