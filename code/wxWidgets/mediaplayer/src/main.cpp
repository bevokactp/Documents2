
#include <unordered_set>
#include <wx/stattext.h>
#include <string>
#include <array>
#include <sstream>
#include <memory>
#include <iomanip>
#include <set>
#include <random>

#include <vlc/vlc.h>
#include <wx/wx.h>
#include <wx/dir.h>
#include <wx/listctrl.h>
#include <wx/filename.h>
#include <wx/datetime.h>


const std::set<wxString> FORMAT_SUPPORT = { "mp4", "m4a", "mp3" };
const wxString MEDIA_PATH_DEFAULT = wxT("/home/bk/Insync/bevokactp@gmail.com/Google Drive/1/pa/звуко/ѧзыче/tolkien/");


wxString SecondsToTimeString(double seconds) {
    int hours = static_cast<int>(seconds) / 3600;
    int minutes = (static_cast<int>(seconds) % 3600) / 60;
    int secs = static_cast<int>(seconds) % 60;
    return wxString::Format("%02d:%02d:%02d", hours, minutes, secs);
}

wxString TimeAgo(const wxDateTime& creationTime) {
    wxDateTime now = wxDateTime::Now();
    wxTimeSpan timeSpan = now.Subtract(creationTime);
    return wxString::Format("%d days ago", timeSpan.GetDays());
}

std::string GetMediaDuration(const wxString& filePath) {
    std::string utf8FilePath = filePath.ToUTF8().data();

    std::string command = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \"" + utf8FilePath + "\"";
    std::array<char, 128> buffer;
    std::string result;

    FILE* pipe = popen(command.c_str(), "r");
    if (!pipe) {
        std::cerr << "Error opening pipe for file: " << utf8FilePath << std::endl;
        return "Error";
    }

    while (fgets(buffer.data(), buffer.size(), pipe) != nullptr) {
        result += buffer.data();
    }

    pclose(pipe);

    if (result.empty()) {
        return "Error";
    }

    double duration = std::stod(result);
    return SecondsToTimeString(duration).ToStdString();
}

wxString CalculateTimeAgo(const wxDateTime& pastDate) {
    wxDateTime now = wxDateTime::Now();

    int years = now.GetYear() - pastDate.GetYear();
    int months = now.GetMonth() - pastDate.GetMonth();
    int days = now.GetDay() - pastDate.GetDay();


    if (days < 0) {
        wxDateTime tempDate = now;
        tempDate.SetDay(1);
        tempDate.Subtract(wxTimeSpan::Days(1));
        int daysInPreviousMonth = tempDate.GetDay();
        days += daysInPreviousMonth;
        months--;
    }


    if (months < 0) {
        years--;
        months += 12;
    }

    return wxString::Format("%03d:%02d:%02d", years, months, days);
}


class MediaFileFrame : public wxFrame {
    public:
    MediaFileFrame(const wxString& title);
    ~MediaFileFrame();

    private:
    void InitializePlayer();
    void OnScanDirectoryOnStartup(const wxString& folderPath);
    void OnScanButtonClick(wxCommandEvent& event);
    void OnListItemActivated(wxListEvent& event);
    void OnStartButtonClick(wxCommandEvent& event);
    void OnPauseContinueButtonClick(wxCommandEvent& event);
    void OnStopButtonClick(wxCommandEvent& event);
    void PlayMedia(const wxString& filePath);
    void PlayNext();
    void UpdateStatistics();
    void OnRemoveDuplicates(wxCommandEvent& event);
    void OnClose(wxCloseEvent& event);

    wxListCtrl* fileListCtrl;

    wxStaticText* currentTimeText;
    wxStaticText* durationText;
    wxStaticText* remainingTimeText;
    wxStaticText* totalFilesText;
    wxStaticText* audioFilesText;
    wxStaticText* videoFilesText;

    wxButton* scanButton;
    wxButton* startButton;
    wxButton* pauseContinueButton;
    wxButton* stopButton;
    wxCheckBox* repeatOnceCheckBox;
    wxCheckBox* randomCheckBox;

    libvlc_instance_t* vlcInstance;
    libvlc_media_player_t* mediaPlayer;

    wxDECLARE_EVENT_TABLE();
};


wxBEGIN_EVENT_TABLE(MediaFileFrame, wxFrame)
EVT_BUTTON(10002, MediaFileFrame::OnStartButtonClick)
EVT_BUTTON(10003, MediaFileFrame::OnPauseContinueButtonClick)
EVT_BUTTON(10004, MediaFileFrame::OnStopButtonClick)
EVT_LIST_ITEM_ACTIVATED(wxID_ANY, MediaFileFrame::OnListItemActivated)
wxEND_EVENT_TABLE()


MediaFileFrame::MediaFileFrame(const wxString& title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(1000, 600)) {

    wxPanel* panel = new wxPanel(this);
    wxBoxSizer* sizer = new wxBoxSizer(wxVERTICAL);

    fileListCtrl = new wxListCtrl(panel, wxID_ANY, wxDefaultPosition, wxDefaultSize, wxLC_REPORT | wxLC_SINGLE_SEL);
    fileListCtrl->InsertColumn(0, "ID", wxLIST_FORMAT_RIGHT, 50);
    fileListCtrl->InsertColumn(1, "File Name", wxLIST_FORMAT_LEFT, 200);
    fileListCtrl->InsertColumn(2, "Duration", wxLIST_FORMAT_CENTER, 70);
    fileListCtrl->InsertColumn(3, "Created", wxLIST_FORMAT_CENTER, 150);
    fileListCtrl->InsertColumn(4, "Time Ago", wxLIST_FORMAT_CENTER, 100);
    fileListCtrl->InsertColumn(5, "Filesize", wxLIST_FORMAT_RIGHT, 100);
    fileListCtrl->InsertColumn(6, "Ext", wxLIST_FORMAT_CENTER, 50);
    fileListCtrl->InsertColumn(7, "File Path", wxLIST_FORMAT_LEFT, 400);

    sizer->Add(fileListCtrl, 1, wxEXPAND | wxALL, 10);

    wxBoxSizer* controlSizer = new wxBoxSizer(wxHORIZONTAL);

    startButton = new wxButton(panel, 10002, "Start");
    pauseContinueButton = new wxButton(panel, 10003, "PauseC/ontinue");
    stopButton = new wxButton(panel, 10004, "Stop");
    scanButton = new wxButton(panel, 10001, "Scan Directory");
    repeatOnceCheckBox = new wxCheckBox(panel, wxID_ANY, "Repeat Once");
    randomCheckBox = new wxCheckBox(panel, wxID_ANY, "Random");
    totalFilesText = new wxStaticText(panel, wxID_ANY, "Total Files: 0");
    audioFilesText = new wxStaticText(panel, wxID_ANY, "Audio Files: 0");
    videoFilesText = new wxStaticText(panel, wxID_ANY, "Video Files: 0");

    controlSizer->Add(scanButton, 0, wxALL, 5);
    controlSizer->Add(startButton, 0, wxALL, 5);
    controlSizer->Add(pauseContinueButton, 0, wxALL, 5);
    controlSizer->Add(stopButton, 0, wxALL, 5);
    controlSizer->Add(repeatOnceCheckBox, 0, wxALL, 5);
    controlSizer->Add(randomCheckBox, 0, wxALL, 5);
    controlSizer->Add(totalFilesText, 0, wxALL, 5);
    controlSizer->Add(audioFilesText, 0, wxALL, 5);
    controlSizer->Add(videoFilesText, 0, wxALL, 5);

    wxButton* removeDuplicatesButton = new wxButton(panel, wxID_ANY, "Remove Duplicates");
    controlSizer->Add(removeDuplicatesButton, 0, wxALL, 5);
    removeDuplicatesButton->Bind(wxEVT_BUTTON, &MediaFileFrame::OnRemoveDuplicates, this);

    sizer->Add(controlSizer, 0, wxALIGN_CENTER);

    currentTimeText = new wxStaticText(panel, wxID_ANY, "Current Time: 00:00:00");
    durationText = new wxStaticText(panel, wxID_ANY, "Duration: 00:00:00");
    remainingTimeText = new wxStaticText(panel, wxID_ANY, "Remaining Time: 00:00:00");

    sizer->Add(currentTimeText, 0, wxALIGN_LEFT | wxALL, 5);
    sizer->Add(durationText, 0, wxALIGN_LEFT | wxALL, 5);
    sizer->Add(remainingTimeText, 0, wxALIGN_LEFT | wxALL, 5);

    panel->SetSizer(sizer);

    InitializePlayer();

    OnScanDirectoryOnStartup(MEDIA_PATH_DEFAULT);
}


MediaFileFrame::~MediaFileFrame() {
    libvlc_media_player_stop(mediaPlayer);
    libvlc_media_player_release(mediaPlayer);
    libvlc_release(vlcInstance);
}



void MediaFileFrame::OnScanDirectoryOnStartup(const wxString& folderPath) {

    wxDir dir(folderPath);
    if (!dir.IsOpened()) {
        wxLogError("Could not open directory: %s", folderPath);
        return;
    }
    fileListCtrl->DeleteAllItems();

    wxString filename;
    bool hasFile = dir.GetFirst(&filename, wxEmptyString, wxDIR_FILES);

    int index = 0;
    while (hasFile) {
        wxFileName fileName(filename);
        wxFileName fullPath(folderPath, filename);
        wxString parentDir = fullPath.GetPath();
        wxString name = fileName.GetName();
        wxString filePath = fileName.GetFullPath();
        wxString extension = fileName.GetExt().Lower();

        if (FORMAT_SUPPORT.find(extension) != FORMAT_SUPPORT.end()) {

            std::string duration = GetMediaDuration(fullPath.GetFullPath());

            wxDateTime createdTime = fullPath.GetModificationTime();
            wxString timeAgo = CalculateTimeAgo(createdTime); {}

            wxULongLong fileSize = fullPath.GetSize();
            wxString fileSizeStr = wxFileName::GetHumanReadableSize(fileSize, "B", 1);

            long itemIndex = fileListCtrl->InsertItem(index, wxString::Format("%d", index));
            fileListCtrl->SetItem(itemIndex, 0, wxString::Format("%d", index), wxLIST_FORMAT_RIGHT);
            fileListCtrl->SetItem(itemIndex, 1, name, wxLIST_FORMAT_LEFT);
            fileListCtrl->SetItem(itemIndex, 2, duration, wxLIST_FORMAT_RIGHT);
            fileListCtrl->SetItem(itemIndex, 3, createdTime.FormatISOCombined(' '), wxLIST_FORMAT_RIGHT);
            fileListCtrl->SetItem(itemIndex, 4, timeAgo, wxLIST_FORMAT_RIGHT);
            fileListCtrl->SetItem(itemIndex, 5, fileSizeStr, wxLIST_FORMAT_RIGHT);
            fileListCtrl->SetItem(itemIndex, 6, extension, wxLIST_FORMAT_CENTER);
            fileListCtrl->SetItem(itemIndex, 7, fullPath.GetFullPath(), wxLIST_FORMAT_LEFT);

            index++;
        }
        hasFile = dir.GetNext(&filename);
    }
}



void MediaFileFrame::OnListItemActivated(wxListEvent& event) {
    long itemIndex = event.GetIndex();
    wxString filePath = fileListCtrl->GetItemText(itemIndex, 7);
    PlayMedia(filePath);
}


void MediaFileFrame::InitializePlayer() {
    vlcInstance = libvlc_new(0, nullptr);
    mediaPlayer = libvlc_media_player_new(vlcInstance);
}


void MediaFileFrame::OnStartButtonClick(wxCommandEvent& event) {

    long selected = fileListCtrl->GetNextItem(-1, wxLIST_NEXT_ALL, wxLIST_STATE_SELECTED);
    if (selected == wxNOT_FOUND) {
        wxLogMessage("No item selected");
        return;
    }

    wxString filePath = fileListCtrl->GetItemText(selected, 7);
    PlayMedia(filePath);
}


void MediaFileFrame::OnPauseContinueButtonClick(wxCommandEvent& event) {

    if (mediaPlayer) {
        libvlc_state_t state = libvlc_media_player_get_state(mediaPlayer);
        if (state == libvlc_Playing) {
            libvlc_media_player_pause(mediaPlayer);
        }
        else if (state == libvlc_Paused) {
            libvlc_media_player_play(mediaPlayer);
        }
    }
}


void MediaFileFrame::OnStopButtonClick(wxCommandEvent& event) {

    if (mediaPlayer) {
        libvlc_media_player_stop(mediaPlayer);
    }
}


void MediaFileFrame::PlayNext() {
    long nextIndex = -1;
    if (randomCheckBox->IsChecked()) {
        std::mt19937 rng(std::random_device{}());
        std::uniform_int_distribution<std::mt19937::result_type> dist(0, fileListCtrl->GetItemCount() - 1);
        nextIndex = dist(rng);
    }
    else {
        long selected = fileListCtrl->GetNextItem(-1, wxLIST_NEXT_ALL, wxLIST_STATE_SELECTED);
        nextIndex = (selected + 1) % fileListCtrl->GetItemCount();
    }

    wxString filePath = fileListCtrl->GetItemText(nextIndex, 7);
    PlayMedia(filePath);
}


void MediaFileFrame::PlayMedia(const wxString& filePath) {
    wxLogError("file: %s", filePath);

    if (mediaPlayer) {
        libvlc_media_player_stop(mediaPlayer);
    }

    libvlc_media_t* media = libvlc_media_new_path(vlcInstance, filePath.ToUTF8().data());
    if (!media) {
        wxLogError("Unable to open media file: %s", filePath);
        return;
    }

    libvlc_media_player_set_media(mediaPlayer, media);
    libvlc_media_release(media);
    libvlc_media_player_play(mediaPlayer);

    if (repeatOnceCheckBox->IsChecked()) {
    }
    else {
    }
}

void MediaFileFrame::UpdateStatistics() {
    int totalFiles = fileListCtrl->GetItemCount();
    int audioFiles = 0;
    int videoFiles = 0;

    for (int i = 0; i < totalFiles; ++i) {
        wxString filePath = fileListCtrl->GetItemText(i, 7);
        wxFileName fileName(filePath);
        wxString ext = fileName.GetExt().Lower();

        if (ext == "mp3" || ext == "wav" || ext == "flac") {
            audioFiles++;
        }
        else if (ext == "mp4" || ext == "avi" || ext == "mkv") {
            videoFiles++;
        }
    }

    totalFilesText->SetLabel(wxString::Format("Total Files: %d", totalFiles));
    audioFilesText->SetLabel(wxString::Format("Audio Files: %d", audioFiles));
    videoFilesText->SetLabel(wxString::Format("Video Files: %d", videoFiles));
}

void MediaFileFrame::OnRemoveDuplicates(wxCommandEvent& event) {
    wxLogMessage("Remove Duplicates button clicked");

    std::unordered_set<wxString> seenFiles;
    long itemIndex = -1;

    while ((itemIndex = fileListCtrl->GetNextItem(itemIndex)) != wxNOT_FOUND) {
        wxString filePath = fileListCtrl->GetItemText(itemIndex, 7);
        if (seenFiles.find(filePath) != seenFiles.end()) {
            fileListCtrl->DeleteItem(itemIndex);
            itemIndex--;
        }
        else {
            seenFiles.insert(filePath);
        }
    }

    UpdateStatistics();
}



class MediaApp : public wxApp {
    public:
    virtual bool OnInit();
};

void MediaFileFrame::OnClose(wxCloseEvent& event) {
    wxLogMessage("Application exiting");
    Destroy();
}

bool MediaApp::OnInit() {
    MediaFileFrame* frame = new MediaFileFrame("Мы11Да8Май Player");
    frame->Show(true);
    return true;
}

wxIMPLEMENT_APP(MediaApp);
