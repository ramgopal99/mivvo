"use client";

import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Play, RotateCcw, Code, Info, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MonacoEditor, { MonacoEditorRef } from './MonacoEditor';
import { courses } from '../data/lessonsData';

interface CodeTemplate {
  id: string;
  language: string;
  code: string;
  description?: string;
  isActive: boolean;
}

interface RightTopSectionProps {
  onConsoleOutput: (output: string) => void;
}


const RightTopSection = ({ onConsoleOutput }: RightTopSectionProps) => {
  const editorRef = useRef<MonacoEditorRef>(null);
  const { data: session, status } = useSession();
  const [isRunning, setIsRunning] = useState(false);
  const [templates, setTemplates] = useState<CodeTemplate[]>([]);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('python');
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    rollNumber?: string;
    college?: {
      id: string;
      name: string;
      collegeId: string;
    };
  } | null>(null);

  // Fetch code templates from database
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Get course ID from the first course in the data
        const courseId = courses.length > 0 ? courses[0].id : null;

        if (!courseId) {
          console.log('No course available yet, skipping template fetch');
          setTemplatesLoaded(true);
          return;
        }

        const response = await fetch(`/api/code-templates?courseId=${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setTemplates(data);

          // Set the first available template as current language
          if (data.length > 0) {
            const firstTemplate = data[0];
            setCurrentLanguage(firstTemplate.language);

            // If editor is already mounted, set the value and language
            if (editorRef.current) {
              editorRef.current.setValue(firstTemplate.code);
              editorRef.current.setLanguage(firstTemplate.language);
            }
          }
        } else {
          console.error('Failed to fetch code templates');
          setTemplates([]);
        }
      } catch (error) {
        console.error('Error fetching code templates:', error);
      } finally {
        setTemplatesLoaded(true);
      }
    };

    // Only fetch if courses are loaded
    if (courses.length > 0) {
      fetchTemplates();
    } else {
      setTemplatesLoaded(true);
    }
  }, []); // Remove courses.length dependency as it's not needed

  // Update editor value and language when templates load
  useEffect(() => {
    if (templatesLoaded && templates.length > 0 && editorRef.current) {
      const currentTemplate = templates.find(t => t.language === currentLanguage);
      if (currentTemplate) {
        editorRef.current.setValue(currentTemplate.code);
        editorRef.current.setLanguage(currentTemplate.language);
      }
    }
  }, [templatesLoaded, templates, currentLanguage]);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check for JWT tokens (college students) - updated to match new token storage
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('student_token') ||
                     localStorage.getItem('college_token');
        if (token) {
          try {
            const response = await fetch('/api/auth/session', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (response.ok) {
              const sessionData = await response.json();

              if (sessionData.authenticated && sessionData.user) {
                setUserData({
                  id: sessionData.user.id,
                  name: sessionData.user.name,
                  email: sessionData.user.email,
                  role: sessionData.user.role,
                  firstName: sessionData.user.name?.split(' ')[0] || '',
                  lastName: sessionData.user.name?.split(' ').slice(1).join(' ') || '',
                  rollNumber: sessionData.user.rollNumber,
                  college: sessionData.user.collegeId ? {
                    id: sessionData.user.collegeId,
                    name: sessionData.user.collegeName,
                    collegeId: sessionData.user.collegeId
                  } : undefined
                });
                return;
              }
            }
          } catch (error) {
            console.error('Error checking college student session:', error);
          }
        }

        if (status === 'authenticated' && session?.user) {
          setUserData({
            id: session.user.id || 'unknown',
            name: session.user.name || 'User',
            email: session.user.email || '',
            role: (session.user as { role?: string })?.role || 'USER',
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
            rollNumber: undefined,
            college: undefined
          });
          return;
        }

        setUserData(null);
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserData(null);
      }
    };

    loadUserData();
  }, [session, status]);

  const getDefaultCode = (language: string): string => {
    const template = templates.find(t => t.language === language);
    return template?.code || '';
  };

  const handleRun = async () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    if (!code.trim()) {
      onConsoleOutput('Please enter some code to run.');
      return;
    }

    setIsRunning(true);
    onConsoleOutput('Running code...');

    try {
      // Prepare the request for Piston API
      const requestBody = {
        code: code,
        language: currentLanguage
      };

      // Call the API
      const response = await fetch('/api/piston', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Pass the raw result to be displayed by RightBottomSection
      onConsoleOutput(JSON.stringify(result));

    } catch (error: unknown) {
      let errorMessage = error instanceof Error ? error.message : String(error);

      // Provide more user-friendly error messages
      if (errorMessage.includes('timed out') || errorMessage.includes('Time limit exceeded')) {
        errorMessage = 'Code execution timed out. Try simpler code or avoid infinite loops.';
      } else if (errorMessage.includes('Failed to execute code')) {
        errorMessage = 'Unable to connect to code execution service. Please try again later.';
      } else if (errorMessage.includes('SyntaxError') || errorMessage.includes('IndentationError')) {
        errorMessage = 'Syntax error in your code. Please check your code and try again.';
      }

      const errorResult = {
        output: "",
        error: errorMessage,
        language: currentLanguage,
        executionTime: 0,
        memoryUsage: 0,
        exitCode: 1
      };
      onConsoleOutput(JSON.stringify(errorResult));
    } finally {
      setIsRunning(false);
    }
  };


  const handleReset = () => {
    if (editorRef.current) {
      const defaultCode = getDefaultCode(currentLanguage);
      editorRef.current.setValue(defaultCode);
      onConsoleOutput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="pr-6 pl-4 py-3 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Code Editor</h3>
        <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Python</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Python Code Execution</p>
                <p className="text-xs">No GUI libraries (PyGame, Tkinter)</p>
                <p className="text-xs">No web frameworks or complex dependencies</p>
                <p className="text-xs">Time limit: ~3 seconds</p>
              </div>
            </TooltipContent>
          </Tooltip>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2 gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt={userData?.name || session?.user?.name || "User"}
                  />
                  <AvatarFallback className="text-xs">
                    {(userData?.name || session?.user?.name || "User").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userData?.name || session?.user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email || session?.user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <MonacoEditor
            ref={editorRef}
            defaultValue={templatesLoaded && templates.length > 0 ? getDefaultCode(currentLanguage) : ''}
            height="100%"
            language={currentLanguage}
          />
        </div>
        <div className="flex items-center justify-between pr-6 pl-4 py-3 border-t bg-muted/30">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleRun}
              disabled={isRunning}
            >
              <Play className="h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightTopSection;
