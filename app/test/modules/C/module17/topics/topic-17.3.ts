import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_3: SubLesson = {
  id: '17.3',
  title: 'GUI Programming Concepts in C',
  status: 'demo',
  content: `# GUI Programming Concepts in C

## GTK+ (GIMP Toolkit)

### Basic GTK+ Application
\`\`\`c
#include <gtk/gtk.h>

// Callback function for button click
static void on_button_clicked(GtkWidget *widget, gpointer data) {
    g_print("Button clicked!\n");
}

// Callback for window close
static gboolean on_window_delete(GtkWidget *widget, GdkEvent *event, gpointer data) {
    gtk_main_quit();
    return FALSE;
}

int main(int argc, char *argv[]) {
    GtkWidget *window;
    GtkWidget *button;
    GtkWidget *vbox;

    // Initialize GTK
    gtk_init(&argc, &argv);

    // Create main window
    window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(window), "My GTK App");
    gtk_window_set_default_size(GTK_WINDOW(window), 300, 200);

    // Connect signals
    g_signal_connect(window, "delete-event", G_CALLBACK(on_window_delete), NULL);

    // Create vertical box container
    vbox = gtk_vbox_new(FALSE, 5);
    gtk_container_add(GTK_CONTAINER(window), vbox);

    // Create button
    button = gtk_button_new_with_label("Click me!");
    g_signal_connect(button, "clicked", G_CALLBACK(on_button_clicked), NULL);
    gtk_box_pack_start(GTK_BOX(vbox), button, TRUE, TRUE, 0);

    // Show all widgets
    gtk_widget_show_all(window);

    // Start main event loop
    gtk_main();

    return 0;
}
\`\`\`

### Advanced GTK+ Widgets

**Text Entry and Display:**
\`\`\`c
#include <gtk/gtk.h>

typedef struct {
    GtkWidget *window;
    GtkWidget *entry;
    GtkWidget *text_view;
} AppWidgets;

static void on_submit_clicked(GtkWidget *widget, AppWidgets *app) {
    const gchar *text = gtk_entry_get_text(GTK_ENTRY(app->entry));

    GtkTextBuffer *buffer = gtk_text_view_get_buffer(GTK_TEXT_VIEW(app->text_view));
    GtkTextIter end;
    gtk_text_buffer_get_end_iter(buffer, &end);
    gtk_text_buffer_insert(buffer, &end, text, -1);
    gtk_text_buffer_insert(buffer, &end, "\n", -1);

    // Clear entry
    gtk_entry_set_text(GTK_ENTRY(app->entry), "");
}

int main(int argc, char *argv[]) {
    gtk_init(&argc, &argv);

    AppWidgets *app = g_malloc(sizeof(AppWidgets));

    // Create window
    app->window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(app->window), "Text Input Demo");
    gtk_window_set_default_size(GTK_WINDOW(app->window), 400, 300);
    g_signal_connect(app->window, "destroy", G_CALLBACK(gtk_main_quit), NULL);

    // Create vertical box
    GtkWidget *vbox = gtk_vbox_new(FALSE, 5);
    gtk_container_add(GTK_CONTAINER(app->window), vbox);

    // Create entry field
    app->entry = gtk_entry_new();
    gtk_entry_set_placeholder_text(GTK_ENTRY(app->entry), "Enter text here...");
    gtk_box_pack_start(GTK_BOX(vbox), app->entry, FALSE, FALSE, 0);

    // Create submit button
    GtkWidget *button = gtk_button_new_with_label("Submit");
    g_signal_connect(button, "clicked", G_CALLBACK(on_submit_clicked), app);
    gtk_box_pack_start(GTK_BOX(vbox), button, FALSE, FALSE, 0);

    // Create scrolled window for text view
    GtkWidget *scrolled_window = gtk_scrolled_window_new(NULL, NULL);
    gtk_scrolled_window_set_policy(GTK_SCROLLED_WINDOW(scrolled_window),
                                   GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);
    gtk_box_pack_start(GTK_BOX(vbox), scrolled_window, TRUE, TRUE, 0);

    // Create text view
    app->text_view = gtk_text_view_new();
    gtk_text_view_set_editable(GTK_TEXT_VIEW(app->text_view), FALSE);
    gtk_container_add(GTK_CONTAINER(scrolled_window), app->text_view);

    gtk_widget_show_all(app->window);
    gtk_main();

    g_free(app);
    return 0;
}
\`\`\`

**Menu System:**
\`\`\`c
#include <gtk/gtk.h>

static void on_menu_file_new(GtkWidget *widget, gpointer data) {
    g_print("New file\n");
}

static void on_menu_file_open(GtkWidget *widget, gpointer data) {
    GtkWidget *dialog = gtk_file_chooser_dialog_new("Open File",
                                                    GTK_WINDOW(data),
                                                    GTK_FILE_CHOOSER_ACTION_OPEN,
                                                    "_Cancel", GTK_RESPONSE_CANCEL,
                                                    "_Open", GTK_RESPONSE_ACCEPT,
                                                    NULL);

    if (gtk_dialog_run(GTK_DIALOG(dialog)) == GTK_RESPONSE_ACCEPT) {
        char *filename = gtk_file_chooser_get_filename(GTK_FILE_CHOOSER(dialog));
        g_print("Selected file: %s\n", filename);
        g_free(filename);
    }

    gtk_widget_destroy(dialog);
}

static GtkWidget *create_menu_bar(GtkWidget *window) {
    // Create menu bar
    GtkWidget *menu_bar = gtk_menu_bar_new();

    // File menu
    GtkWidget *file_menu = gtk_menu_new();
    GtkWidget *file_item = gtk_menu_item_new_with_label("File");
    gtk_menu_item_set_submenu(GTK_MENU_ITEM(file_item), file_menu);

    // File menu items
    GtkWidget *new_item = gtk_menu_item_new_with_label("New");
    GtkWidget *open_item = gtk_menu_item_new_with_label("Open");
    GtkWidget *quit_item = gtk_menu_item_new_with_label("Quit");

    g_signal_connect(new_item, "activate", G_CALLBACK(on_menu_file_new), window);
    g_signal_connect(open_item, "activate", G_CALLBACK(on_menu_file_open), window);
    g_signal_connect(quit_item, "activate", G_CALLBACK(gtk_main_quit), NULL);

    gtk_menu_shell_append(GTK_MENU_SHELL(file_menu), new_item);
    gtk_menu_shell_append(GTK_MENU_SHELL(file_menu), open_item);
    gtk_menu_shell_append(GTK_MENU_SHELL(file_menu), gtk_separator_menu_item_new());
    gtk_menu_shell_append(GTK_MENU_SHELL(file_menu), quit_item);

    gtk_menu_shell_append(GTK_MENU_SHELL(menu_bar), file_item);

    return menu_bar;
}

int main(int argc, char *argv[]) {
    gtk_init(&argc, &argv);

    GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(window), "Menu Demo");
    gtk_window_set_default_size(GTK_WINDOW(window), 400, 300);
    g_signal_connect(window, "destroy", G_CALLBACK(gtk_main_quit), NULL);

    // Create vertical box
    GtkWidget *vbox = gtk_vbox_new(FALSE, 0);
    gtk_container_add(GTK_CONTAINER(window), vbox);

    // Add menu bar
    GtkWidget *menu_bar = create_menu_bar(window);
    gtk_box_pack_start(GTK_BOX(vbox), menu_bar, FALSE, FALSE, 0);

    // Add some content
    GtkWidget *label = gtk_label_new("Use the File menu above");
    gtk_box_pack_start(GTK_BOX(vbox), label, TRUE, TRUE, 0);

    gtk_widget_show_all(window);
    gtk_main();

    return 0;
}
\`\`\`

## Cross-Platform GUI Libraries

### IUP (Portable User Interface)
\`\`\`c
#include <iup.h>
#include <iupcontrols.h>

int main(int argc, char *argv[]) {
    IupOpen(&argc, &argv);

    // Create dialog
    Ihandle *dialog = IupDialog(
        IupVbox(
            IupLabel("Hello, IUP!"),
            IupButton("OK", NULL),
            NULL
        )
    );

    IupSetAttribute(dialog, "TITLE", "IUP Demo");
    IupSetAttribute(dialog, "SIZE", "200x100");

    IupShow(dialog);
    IupMainLoop();

    IupClose();

    return 0;
}
\`\`\`

### FLTK (Fast Light Toolkit)
\`\`\`cpp
#include <FL/Fl.H>
#include <FL/Fl_Window.H>
#include <FL/Fl_Button.H>
#include <FL/Fl_Input.H>

void button_callback(Fl_Widget *widget, void *data) {
    Fl_Input *input = (Fl_Input *)data;
    printf("Input text: %s\n", input->value());
}

int main() {
    Fl_Window *window = new Fl_Window(300, 200, "FLTK Demo");

    Fl_Input *input = new Fl_Input(50, 50, 200, 30, "Name:");
    Fl_Button *button = new Fl_Button(100, 100, 100, 30, "Submit");

    button->callback(button_callback, input);

    window->end();
    window->show();

    return Fl::run();
}
\`\`\`

## ncurses - Terminal UI

### Basic ncurses Application
\`\`\`c
#include <ncurses.h>
#include <string.h>

int main() {
    // Initialize ncurses
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);

    // Print welcome message
    mvprintw(0, 0, "Welcome to ncurses demo!");
    mvprintw(2, 0, "Press 'q' to quit");

    // Create a simple menu
    const char *menu_items[] = {
        "Option 1",
        "Option 2",
        "Option 3",
        "Exit"
    };

    int num_items = sizeof(menu_items) / sizeof(menu_items[0]);
    int current_item = 0;

    while (1) {
        // Clear screen
        clear();

        // Display menu
        for (int i = 0; i < num_items; i++) {
            if (i == current_item) {
                attron(A_REVERSE);  // Highlight current item
                mvprintw(4 + i, 5, "> %s", menu_items[i]);
                attroff(A_REVERSE);
            } else {
                mvprintw(4 + i, 5, "  %s", menu_items[i]);
            }
        }

        // Get user input
        int ch = getch();

        switch (ch) {
            case KEY_UP:
                current_item = (current_item - 1 + num_items) % num_items;
                break;
            case KEY_DOWN:
                current_item = (current_item + 1) % num_items;
                break;
            case '\n':  // Enter key
                if (current_item == num_items - 1) {  // Exit
                    goto cleanup;
                }
                mvprintw(10, 0, "Selected: %s", menu_items[current_item]);
                getch();  // Wait for key press
                break;
            case 'q':
                goto cleanup;
        }

        refresh();
    }

cleanup:
    // Clean up ncurses
    endwin();

    return 0;
}
\`\`\`

### Advanced ncurses Features

**Windows and Panels:**
\`\`\`c
#include <ncurses.h>
#include <panel.h>

int main() {
    initscr();
    cbreak();
    noecho();

    // Create windows
    WINDOW *win1 = newwin(10, 30, 2, 5);
    WINDOW *win2 = newwin(10, 30, 2, 40);

    // Create panels
    PANEL *panel1 = new_panel(win1);
    PANEL *panel2 = new_panel(win2);

    // Draw borders
    box(win1, 0, 0);
    box(win2, 0, 0);

    // Add content
    mvwprintw(win1, 1, 2, "Window 1");
    mvwprintw(win2, 1, 2, "Window 2");

    // Update panels
    update_panels();
    doupdate();

    // Handle input
    int ch;
    while ((ch = getch()) != 'q') {
        switch (ch) {
            case '\t':  // Tab to switch panels
                if (panel_hidden(panel1)) {
                    show_panel(panel1);
                    hide_panel(panel2);
                } else {
                    show_panel(panel2);
                    hide_panel(panel1);
                }
                break;
        }
        update_panels();
        doupdate();
    }

    // Clean up
    del_panel(panel1);
    del_panel(panel2);
    delwin(win1);
    delwin(win2);
    endwin();

    return 0;
}
\`\`\`

## OpenGL with GLUT

### Basic OpenGL Application
\`\`\`c
#include <GL/glut.h>
#include <math.h>

// Display callback
void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // Draw a triangle
    glBegin(GL_TRIANGLES);
        glColor3f(1.0, 0.0, 0.0);
        glVertex2f(-0.5, -0.5);

        glColor3f(0.0, 1.0, 0.0);
        glVertex2f(0.5, -0.5);

        glColor3f(0.0, 0.0, 1.0);
        glVertex2f(0.0, 0.5);
    glEnd();

    glutSwapBuffers();
}

// Reshape callback
void reshape(int width, int height) {
    glViewport(0, 0, width, height);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-1.0, 1.0, -1.0, 1.0);
}

// Keyboard callback
void keyboard(unsigned char key, int x, int y) {
    if (key == 27) {  // ESC key
        exit(0);
    }
}

int main(int argc, char *argv[]) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB);
    glutInitWindowSize(800, 600);
    glutCreateWindow("OpenGL Demo");

    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutKeyboardFunc(keyboard);

    glutMainLoop();

    return 0;
}
\`\`\`

## GUI Event-Driven Programming

### Event Loop Concepts
\`\`\`c
#include <gtk/gtk.h>

// Custom event structure
typedef struct {
    int type;
    void *data;
    GDestroyNotify destroy_func;
} CustomEvent;

// Event queue
typedef struct {
    GQueue *queue;
    GMutex mutex;
    GCond cond;
} EventQueue;

// Global event queue
static EventQueue *global_queue = NULL;

// Initialize event system
void event_system_init() {
    global_queue = g_malloc(sizeof(EventQueue));
    global_queue->queue = g_queue_new();
    g_mutex_init(&global_queue->mutex);
    g_cond_init(&global_queue->cond);
}

// Post event
void post_event(CustomEvent *event) {
    g_mutex_lock(&global_queue->mutex);
    g_queue_push_tail(global_queue->queue, event);
    g_cond_signal(&global_queue->cond);
    g_mutex_unlock(&global_queue->mutex);
}

// Process events (call from GUI thread)
gboolean process_events(gpointer data) {
    g_mutex_lock(&global_queue->mutex);

    while (!g_queue_is_empty(global_queue->queue)) {
        CustomEvent *event = g_queue_pop_head(global_queue->queue);
        g_mutex_unlock(&global_queue->mutex);

        // Process event based on type
        switch (event->type) {
            case 1:  // Example event
                g_print("Processing event type 1\n");
                break;
        }

        // Clean up
        if (event->destroy_func) {
            event->destroy_func(event->data);
        }
        g_free(event);

        g_mutex_lock(&global_queue->mutex);
    }

    g_mutex_unlock(&global_queue->mutex);

    return TRUE;  // Continue calling
}

int main(int argc, char *argv[]) {
    gtk_init(&argc, &argv);

    event_system_init();

    // Create GUI
    GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(window), "Event Demo");
    g_signal_connect(window, "destroy", G_CALLBACK(gtk_main_quit), NULL);

    // Set up periodic event processing
    g_timeout_add(100, process_events, NULL);  // Process every 100ms

    gtk_widget_show_all(window);

    // Post some events
    CustomEvent *event = g_malloc(sizeof(CustomEvent));
    event->type = 1;
    event->data = NULL;
    event->destroy_func = NULL;
    post_event(event);

    gtk_main();

    // Clean up
    g_mutex_clear(&global_queue->mutex);
    g_cond_clear(&global_queue->cond);
    g_queue_free(global_queue->queue);
    g_free(global_queue);

    return 0;
}
\`\`\`

GUI programming in C requires understanding event-driven programming, widget hierarchies, and platform-specific APIs. Libraries like GTK+, IUP, and ncurses provide different approaches to creating graphical and text-based user interfaces.`
};

