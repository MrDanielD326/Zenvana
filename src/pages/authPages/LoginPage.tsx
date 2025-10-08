import AuthLayout from '@/components/customUI/AuthLayout'
import FormLayout from '@/components/customUI/FormLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { LoginSSO } from '@/components/customUI/ClerkAuth'

const LoginPage = () => {
  const navigate = useNavigate();
  const navSignup = () => navigate("/signup");
  const appleIcon = <img src="buttonApple.svg" alt="Apple Icon" className="w-4 h-4" />;

  const formContent = () => (
    <div className="flex flex-col gap-8">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email" className="text-gray-500"> Email Address </Label>
        <div className="grid grid-cols-[1fr_auto] gap-2 w-full max-w-xs">
          <Input type="email" id="email" />
          <Button size="sm"> Get OTP </Button>
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="passcode" className="text-gray-500"> Passcode </Label>
        <InputOTP maxLength={6}>
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => <InputOTPGroup key={i}> <InputOTPSlot index={i} /> </InputOTPGroup>)}
          </div>
        </InputOTP>
      </div>

      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-sm font-semibold"> OR </span>
        <hr className="flex-1" />
      </div>

      <div className="flex flex-col gap-4">
        <LoginSSO />
        <Button variant="outline"> {appleIcon} Continue with Apple </Button>
        <Button variant="link" onClick={navSignup}> Sign-Up </Button>
      </div>
    </div>
  );

  return <AuthLayout image={"backgroundD.svg"} form={<FormLayout title='Login' forms={formContent()} />} />

}

export default LoginPage
