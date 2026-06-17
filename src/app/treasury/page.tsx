"use client";

import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TREASURY_MESSAGE, BANK_ACCOUNTS } from "@/lib/config";

export default function TreasuryPage() {
    return (
        <>
            <section className="page-hero">
                <div className="page-hero-overlay" />
                <div className="page-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="page-hero-eyebrow">
                            <span className="chapter-mark">The Royal Treasury</span>
                        </div>
                        <h1>Gifts</h1>
                        <p className="page-hero-sub">
                            For loved ones asking how to celebrate with the family.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-band section-dark">
                <ScrollReveal>
                    <div className="treasury-letter">
                        <span className="chapter-mark">A Word of Gratitude</span>
                        <div className="treasury-letter-body">
                            <p>{TREASURY_MESSAGE.gratitude}</p>
                            <p>{TREASURY_MESSAGE.kindness}</p>
                            <p>{TREASURY_MESSAGE.invite}</p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            <section className="bank-section section-band">
                <ScrollReveal>
                    <div className="bank-header">
                        <span className="chapter-mark">Account Details</span>
                        <h2>Bank Information</h2>
                    </div>
                </ScrollReveal>

                <div className="bank-list">
                    {BANK_ACCOUNTS.map((acc, i) => (
                        <ScrollReveal key={acc.currency} delay={i * 0.1}>
                            <div className="bank-block">
                                <div className="bank-block-currency">
                                    <Landmark size={16} />
                                    <span>{acc.currency}</span>
                                </div>
                                <div className="bank-rows">
                                    <div className="bank-row">
                                        <span className="bank-label">Account Name</span>
                                        <span className="bank-value">{acc.name}</span>
                                    </div>
                                    <div className="bank-row">
                                        <span className="bank-label">Bank</span>
                                        <span className="bank-value">{acc.bank}</span>
                                    </div>
                                    <div className="bank-row">
                                        <span className="bank-label">Account Number</span>
                                        <span className="bank-value mono">{acc.accountNumber}</span>
                                    </div>
                                    {"sortCode" in acc && (
                                        <div className="bank-row">
                                            <span className="bank-label">Sort Code</span>
                                            <span className="bank-value mono">{acc.sortCode}</span>
                                        </div>
                                    )}
                                    {"iban" in acc && (
                                        <div className="bank-row">
                                            <span className="bank-label">IBAN</span>
                                            <span className="bank-value mono">{acc.iban}</span>
                                        </div>
                                    )}
                                    {"bic" in acc && (
                                        <div className="bank-row">
                                            <span className="bank-label">BIC</span>
                                            <span className="bank-value mono">{acc.bic}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            <section className="section-band section-dark">
                <ScrollReveal>
                    <div className="treasury-closing">
                        <span className="chapter-mark">With Gratitude</span>
                        <p>{TREASURY_MESSAGE.closing}</p>
                        <p>{TREASURY_MESSAGE.blessing}</p>
                        <p className="treasury-signature">{TREASURY_MESSAGE.signature}</p>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
}
