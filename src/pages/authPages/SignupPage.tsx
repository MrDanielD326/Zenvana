import AuthLayout from '@/components/customUI/AuthLayout';
import FormLayout from '@/components/customUI/FormLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { LoginSSO } from '@/components/customUI/ClerkAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const appleIcon = <img src="buttonApple.svg" alt="Apple Icon" className="w-4 h-4" />;

  const required = <span className="text-red-500">*</span>;

  const navLogin = () => navigate("/login");

  const formContentStep1 = (
    <div className="flex flex-col gap-8">
      <span className="text-sm font-semibold">
        Welcome! Manage, Track and Grow your Gym with Wellvantage.
      </span>
      <div className="flex flex-col gap-4">
        <LoginSSO />
        <Button variant="outline">{appleIcon} Continue with Apple</Button>
        <span className="text-sm font-semibold">OR</span>
        <Button onClick={() => setStep(2)} variant="destructive">Continue</Button>
      </div>
    </div>
  );

  const formContentStep2 = (
    <div className="flex flex-col gap-8">
      <span className="text-sm font-semibold">Let's build your gym's digital HQ! 🏋️‍♂️</span>
      <span className="text-sm font-semibold">
        Enter your name, address & contact so we can tailor everything for your business.
      </span>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="gymName" className="text-gray-500">Gym Name {required}</Label>
        <Input type="text" id="gymName" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="ownerName" className="text-gray-500">Gym Owner's First Name {required}</Label>
        <span className="text-gray-500 text-sm">(will have access to all features of the app)</span>
        <Input type="text" id="ownerName" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="lastName" className="text-gray-500">Last Name {required}</Label>
        <Input type="text" id="lastName" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="address1" className="text-gray-500">Address Line 1 {required}</Label>
        <Input type="text" id="address1" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="address2" className="text-gray-500">Address Line 2 {required}</Label>
        <Input type="text" id="address2" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="city" className="text-gray-500">City {required}</Label>
        <Input type="text" id="city" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="state" className="text-gray-500">State {required}</Label>
        <Input type="text" id="state" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="country" className="text-gray-500">Country {required}</Label>
        <Input type="text" id="country" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="text" className="text-gray-500">Email Address</Label>
        <div className="grid grid-cols-[1fr_auto] gap-2 w-full max-w-xs">
          <Input type="text" id="phone" placeholder='+91' />
          <Button size="sm"> Verify </Button>
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email" className="text-gray-500">Email Address</Label>
        <div className="grid grid-cols-[1fr_auto] gap-2 w-full max-w-xs">
          <Input type="email" id="email" />
          <Button size="sm">Get OTP</Button>
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="passcode" className="text-gray-500">Passcode</Label>
        <InputOTP maxLength={6}>
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPGroup key={i}><InputOTPSlot index={i} /></InputOTPGroup>
            ))}
          </div>
        </InputOTP>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Checkbox />
        <span className="text-sm">
          I agree to the <Button variant="link" size="sm" className="-m-2.5">Privacy Policy.</Button>
        </span>
      </div>

      <Button onClick={navLogin}>Next</Button>
    </div>
  );

  return (
    <AuthLayout
      image="backgroundD.svg"
      form={<FormLayout title="Sign Up" forms={step === 1 ? formContentStep1 : formContentStep2} />}
    />
  );
};

export default SignupPage;
