#include <iostream>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <set>
#include <nlohmann/json.hpp>

// Simple positive/negative word lists for sentiment scoring
const std::set<std::string> positive_words = {"good", "great", "happy", "love", "excellent", "awesome", "fantastic", "positive", "nice", "wonderful"};
const std::set<std::string> negative_words = {"bad", "sad", "hate", "terrible", "awful", "horrible", "negative", "poor", "worst", "angry"};

struct AnalysisResult {
    int word_count;
    std::vector<std::string> keywords;
    int sentiment_score;
};

AnalysisResult analyze(const std::string& text) {
    std::unordered_map<std::string, int> freq;
    int word_count = 0;
    int sentiment_score = 0;

    std::istringstream iss(text);
    std::string word;
    while (iss >> word) {
        // Normalize to lowercase and strip punctuation
        std::string clean_word;
        for (char c : word) {
            if (isalpha(c)) clean_word += tolower(c);
        }
        if (clean_word.empty()) continue;
        word_count++;
        freq[clean_word]++;
        if (positive_words.count(clean_word)) sentiment_score++;
        if (negative_words.count(clean_word)) sentiment_score--;
    }

    // Extract top 3 keywords
    std::vector<std::pair<std::string, int>> freq_vec(freq.begin(), freq.end());
    std::sort(freq_vec.begin(), freq_vec.end(), [](auto& a, auto& b) {
        return a.second > b.second;
    });
    std::vector<std::string> keywords;
    for (size_t i = 0; i < std::min<size_t>(3, freq_vec.size()); ++i) {
        keywords.push_back(freq_vec[i].first);
    }

    return {word_count, keywords, sentiment_score};
}

int main() {
    std::string input;
    std::getline(std::cin, input);

    AnalysisResult result = analyze(input);

    nlohmann::json j;
    j["word_count"] = result.word_count;
    j["keywords"] = result.keywords;
    j["sentiment_score"] = result.sentiment_score;

    std::cout << j.dump() << std::endl;
    return 0;
}
